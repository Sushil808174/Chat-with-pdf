import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatUI from './components/Display/ChatUI';
import ChatList from './components/Chat/ChatList';
import MessageInput from './components/Chat/MessageInput';
import PdfUpload from './components/Upload/PdfUpload';
import PdfProcessing from './components/Upload/PdfProcessing';
import SearchBar from './components/Search/SearchBar';
import SearchResults from './components/Search/SearchResults';
import QuestionAnswer from './components/Search/QuestionForm';
import MessageHistory from './components/UserHistory/MessageHistory';
import PdfHistory from './components/UserHistory/PdfHistory';
import UserHistoryPage from './components/UserHistory/UserHistoryPage';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login'
import Profile from './components/Auth/Profile';
import QuestionForm from './components/Search/QuestionForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<ChatUI />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chats/:chatId" element={<MessageInput />} />
        <Route path="/upload" element={<PdfUpload />} />
        <Route path="/process" element={<PdfProcessing />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/answer/:question" element={<QuestionForm />} />
        <Route path="/history/messages" element={<MessageHistory />} />
        <Route path="/history/pdfs" element={<PdfHistory />} />
        <Route path="/user/history" element={<UserHistoryPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
