import React, { useState } from 'react';
import axios from 'axios';

const QuestionAnswer = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleAnswer = async () => {
    try {
      const response = await axios.post('/api/answer', { question });
      setAnswer(response.data.answer);
      onAnswer(response.data.answer);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <p>Question: {question}</p>
      <button onClick={handleAnswer}>Get Answer</button>
      {answer && <p>Answer: {answer}</p>}
    </div>
  );
};

export default QuestionAnswer;
