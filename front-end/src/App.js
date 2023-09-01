import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatUI from './components/Display/ChatUI';
import PdfHistory from './components/UserHistory/PdfHistory';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login'
import Profile from './components/Auth/Profile';
import QuestionForm from './components/Search/QuestionForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<ChatUI />} />
        <Route path="/answer/:question" element={<QuestionForm />} />
        <Route path="/history/pdfs" element={<PdfHistory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
