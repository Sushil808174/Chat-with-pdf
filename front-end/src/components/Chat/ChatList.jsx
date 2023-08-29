import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get('/api/chats');
      setChats(response.data.chats);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.participants.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
