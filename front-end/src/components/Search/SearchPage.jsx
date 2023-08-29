import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import QuestionAnswer from './QuestionAnswer';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setSearchResults(response.data.results);
      setSelectedQuestion('');
      setAnswer('');
    } catch (error) {
      // Handle error
    }
  };

  const handleQuestion = (question) => {
    setSelectedQuestion(question);
  };

  const handleAnswer = (ans) => {
    setAnswer(ans);
  };

  return (
    <div>
      <h2>Search Page</h2>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} onQuestion={handleQuestion} />
      {selectedQuestion && (
        <QuestionAnswer question={selectedQuestion} onAnswer={handleAnswer} />
      )}
      {answer && <p>Answer: {answer}</p>}
    </div>
  );
};

export default SearchPage;
