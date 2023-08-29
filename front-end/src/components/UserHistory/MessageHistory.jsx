import React from 'react';

const MessageHistory = ({ messages }) => {
  return (
    <div>
      <h2>Message History</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.sender}: {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageHistory;
