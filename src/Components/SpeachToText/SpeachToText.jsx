import { useState, useRef, useEffect } from 'react';
import './SpeachToText.css';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timeoutRef = useRef(null);

  // بدء التسجيل
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = []; // إعادة تعيين البيانات السابقة
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
        resetSilenceTimeout(); // إعادة تعيين المؤقت عند تسجيل الصوت
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        await sendAudioToServer(blob); // إرسال الصوت عند توقف التسجيل
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsResponseVisible(false);
    } catch (error) {
      console.error('Error accessing audio device:', error);
    }
  };

  // إيقاف التسجيل
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearSilenceTimeout();
  };

  // إعادة تعيين مؤقت التوقف عند الصمت
  const resetSilenceTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (isRecording) {
        stopRecording(); // إيقاف التسجيل تلقائيًا عند الصمت
      }
    }, 500); // مدة الصمت المسموح بها (2 ثانية)
  };

  // تنظيف المؤقت عند التوقف
  const clearSilenceTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // نطق النص باستخدام واجهة SpeechSynthesis
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error('SpeechSynthesis not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // تحديد اللغة إلى العربية
    synth.speak(utterance);
  };

  // إرسال الصوت إلى الخادم
  const sendAudioToServer = async (blob) => {
    if (!blob) {
      console.error('No audio blob available to send.');
      return;
    }

    const formData = new FormData();
    formData.append('file', blob, 'audio.wav');

    try {
      setIsLoading(true);
      setErrorText('');
      const response = await fetch('https://aivoiceassistant.pythonanywhere.com/process_audio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseText(data.classified_text);
        setIsResponseVisible(true);

        // نطق النص عند استلامه
        speakText(data.classified_text);
      } else {
        const data = await response.json();
        setErrorText(data.error);
        console.error('Failed to process audio.');
      }
    } catch (error) {
      console.error('Error sending audio to server:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // تنظيف المؤقت عند إلغاء المكون
  useEffect(() => {
    return () => {
      clearSilenceTimeout();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2> اضغط لمساعدتك</h2>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isRecording ? 'red' : 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
      </button>

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {isResponseVisible && !isLoading && (
        <div style={{ marginTop: '20px' }}>
          <h3>النص المصنف:</h3>
          <p>{responseText}</p>
          {errorText.length > 0 && <p style={{ color: 'red' }}>{errorText}</p>}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
