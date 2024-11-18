import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './Routes/router';
import SpeechToText from './Components/SpeachToText/SpeachToText';
import image from './assets/images/logo.jpeg'
function App() {
  return (
    <div className="App ">
     <RouterProvider router={router}/>

      <div className="gradient-background">
      <a href=''><img className='img' src={image} /></a>
        <h1>مرحبًا بك في المساعد الصوتي</h1>
        <SpeechToText />

        <p>يمكنك الحصول على مساعدة في التوجه للأماكن الموجودة في هذا القسم(الإستقبال أو خدمة العملاء أو الصالة)</p>
      </div>
   

    </div>
  );
}

export default App
