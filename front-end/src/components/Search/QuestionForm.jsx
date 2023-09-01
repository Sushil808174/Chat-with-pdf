import React, { useState } from 'react';
import axios from 'axios';
import './QuestionForm.css'

function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);

  const handleQuestionSubmit = () => {
    if (question) {
      axios.post('http://localhost:8000/ask-question/', { question })
        .then(response => {
          const newEntry = {
            question: question,
            answer: response.data.answer
          };
          setHistory(prevHistory => [...prevHistory, newEntry]);
          setQuestion('');
        })
        .catch(error => {
          console.error('Error submitting question:', error);
        });
    }
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevent default "Enter" behavior
      handleQuestionSubmit();
      
    }
  };
  
  return (
    <div className='main'>
      <div className="searchbar">
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your question..."
          className='question-box'
        />
      </div>
      
      <div className='history'>
        {history.map((entry, index) => (
          <div key={index}>
            <p className='question'><b>Question : </b> {entry.question}</p>
            <p className='answer'><b>Answer : </b> {entry.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionForm;
