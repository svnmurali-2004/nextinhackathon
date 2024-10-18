import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { Send as SendIcon, Mic as MicIcon } from '@mui/icons-material';

const Chatbot = ({ interviewType }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const technicalQuestions = [
    "Can you explain the difference between var, let, and const in JavaScript?",
    "What is the time complexity of binary search?",
    "How would you optimize the performance of a React app?",
    "Explain the concept of closures in JavaScript.",
    "What is a REST API, and how does it differ from GraphQL?",
    "How does garbage collection work in Java?",
  ];

  const hrQuestions = [
    "Tell me about yourself.",
    "Why do you want to work at this company?",
    "What are your greatest strengths and weaknesses?",
    "Can you describe a time when you faced a challenge at work?",
    "Where do you see yourself in five years?",
    "Why should we hire you for this position?",
  ];

  const questions = interviewType === 'Technical' ? technicalQuestions : hrQuestions;

  const botResponse = (text) => {
    const botMessage = { text, user: false };
    setMessages((prev) => [...prev, botMessage]);

    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, user: true };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      botResponse(randomQuestion);
    }, 1000);

    setInput('');
  };

  const handleVoiceInput = () => {
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const userMessage = { text: transcript, user: true };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        botResponse(randomQuestion);
      }, 1000);

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error: ', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Box className="p-4" sx={{ border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', boxShadow: 2, padding: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Interview Type: {interviewType}
      </Typography>

      <Box
        className="chat-window mb-4"
        sx={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '15px',
          borderRadius: '8px',
          backgroundColor: '#f0f0f0',
          marginBottom: '20px',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.user ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            <Box
              sx={{
                maxWidth: '60%',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: msg.user ? '#007bff' : '#e0e0e0',
                color: msg.user ? 'white' : 'black',
                textAlign: msg.user ? 'right' : 'left',
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}
      </Box>

      <Box display="flex" alignItems="center">
        <TextField
          label="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          className="mb-4"
          sx={{ marginRight: '10px' }}
          variant="outlined"
        />

        <IconButton
          color="primary"
          onClick={handleSend}
          aria-label="send message"
          disabled={!input.trim()}
        >
          <SendIcon />
        </IconButton>

        <IconButton
          color="secondary"
          onClick={handleVoiceInput}
          aria-label="voice input"
          disabled={isListening}
          sx={{ marginLeft: '10px' }}
        >
          <MicIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chatbot;
