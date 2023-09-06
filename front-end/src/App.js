import React from 'react';
import './App.css'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import ChatUI from './components/Display/ChatUI';
import PdfHistory from './components/UserHistory/PdfHistory';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login'
import Profile from './components/Auth/Profile';
import QuestionForm from './components/Search/QuestionForm';
// import PrivateRoute from './components/utils/PrivateRoute';
import Links from './components/Display/Links'
import PrivateRoute from './components/utils/PrivateRoute';

function App() {
  return (
    <Router>
      {/* <Links /> */}
      <Routes>
        
        <Route path='/' element={<ChatUI />} />
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
