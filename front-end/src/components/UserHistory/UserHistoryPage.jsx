import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageHistory from './MessageHistory';
import PdfHistory from './PdfHistory';

const UserHistoryPage = () => {
  const [messages, setMessages] = useState([]);
  const [pdfDocuments, setPdfDocuments] = useState([]);

  useEffect(() => {
    fetchMessageHistory();
    fetchPdfHistory();
  }, []);

  const fetchMessageHistory = async () => {
    try {
      const response = await axios.get('/api/user/message-history');
      setMessages(response.data.messages);
    } catch (error) {
      // Handle error
    }
  };

  const fetchPdfHistory = async () => {
    try {
      const response = await axios.get('/api/user/pdf-history');
      setPdfDocuments(response.data.pdfDocuments);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>User History</h2>
      <MessageHistory messages={messages} />
      <PdfHistory pdfDocuments={pdfDocuments} />
    </div>
  );
};

export default UserHistoryPage;
