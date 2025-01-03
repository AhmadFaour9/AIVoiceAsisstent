# AI-Based Intent Recognition and User Guidance System

Abstract: The project aims to develop an intelligent system capable of recognizing speech in various Arabic dialects (e.g., Saudi, Syrian, etc.). This system processes spoken input to guide users to one of three destinations: the lounge, customer service, or reception. This is achieved by leveraging cutting-edge models for Arabic speech recognition and intent detection, ensuring accuracy and reliability across diverse linguistic contexts.
Project Overview:

This innovative project integrates natural language processing (NLP) and deep learning technologies to create a comprehensive system that understands and analyzes spoken or textual input, detects user intent, and provides actionable recommendations.
Key Features and Technologies Used:

    ## Speech and Text Recognition:
        Utilized advanced Encoder models like MARBERT to classify text accurately.
        Integrated GPT-based Decoder models (GPT mini and GPT Queen) for understanding intent with high precision.

    ## Hyperparameter Optimization:
        Employed Optuna to fine-tune model parameters, achieving peak performance with minimal effort.
        Added new categories to the dataset to cover out-of-scope requests, enhancing the model's flexibility.

    ## Similarity Measurements:
        Leveraged Cosine Similarity to measure semantic relevance between inputs and predefined categories.

    ## Interactive Web Interface:
        Built a user-friendly web application with React.js for seamless interaction.
        Enabled functionalities like POST requests for uploading audio files and receiving textual guidance.

    ## Hosting and Deployment:
        Deployed the model backend using PythonAnywhere for stable and scalable service delivery.
        Hosted the user interface on Vercel, ensuring easy access for all users without technical knowledge.

## Achievements:

    Achieved an impressive 98% accuracy (WER = 0.018) after continuous fine-tuning and training using tailored datasets.
    Developed a system that not only understands intent but also guides users accurately to their desired destinations.
    Successfully combined Encoder and Decoder model capabilities to deliver state-of-the-art performance.

## Applications:

This project demonstrates practical use cases in areas requiring robust speech and intent recognition, such as customer service automation, interactive kiosks, and voice-driven assistance systems.
Live Links and Resources:

    User Interface: AI Voice Assistant App https://ai-voice-asisstent.vercel.app/
    Backend Service: AI Voice Assistant Backend https://aivoiceassistant.pythonanywhere.com/
    Code Repository: Source Code https://colab.research.google.com/drive/17n3Dhta4i8OzY-cEMr1uuxd_bE7HWhKU?usp=sharing
    Model Files: Trained Models https://drive.google.com/drive/folders/179zMElLIKCihlIVEW37BhjsLAdyQ3osL?usp=sharing

## Objective:

To push the boundaries of speech recognition and intent detection in Arabic dialects by creating intelligent systems that cater to practical, real-world scenarios and enhance user experiences across industries.
