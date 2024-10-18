import React, { useState } from 'react';
import InterviewForm from './components/InterviewForm';
import Chatbot from "./components/Chatbot";
import './App.css';
import NavBar from './components/NavBar';

const App = () => {
  const [interviewType, setInterviewType] = useState('');

  return (
    <>
    <NavBar/>
    <div className="App">
      {!interviewType ? (
        <InterviewForm setInterviewType={setInterviewType} />
      ) : (
        <Chatbot interviewType={interviewType} />
      )}
    </div>
    </>
  );
};

export default App;
