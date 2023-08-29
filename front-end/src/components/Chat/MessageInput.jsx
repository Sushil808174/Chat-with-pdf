import React, { useState } from 'react';
import axios from 'axios';

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post(`/api/chats/${chatId}/messages`, {
        content: message
      });
      // Handle response and update messages
      setMessage('');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
