import React from 'react';
import './ChatUI.css';
import FileUploader from '../Upload/FileUploader';

function ChatUI() {
  return (
    <div className="display-part">
      <div className="main-div">
        <div className="left-bar">
            <div className="new-chat"><b style={{marginRight:'3px'}}>+</b>New chat</div>
        </div>
        <div className="main-bar">
            <div className="header">
                Chat With Pdf
            </div>

            <div className="pdf-upload">
                < FileUploader />
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default ChatUI;
