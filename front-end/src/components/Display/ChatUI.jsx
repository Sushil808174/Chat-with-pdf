import React from 'react';
import './ChatUI.css';
import FileUploader from '../Upload/FileUploader';
import QuestionForm from '../Search/QuestionForm';
import PdfHistory from '../UserHistory/PdfHistory';

function ChatUI() {
  return (
    <div className="display-part">
      <div className="main-div">
        <div className="left-bar">
            <div className="new-chat"><b style={{marginRight:'3px'}}>+</b>New chat</div>
            <div className='History'>
              <PdfHistory />
            </div>
        </div>
        <div className="main-bar">
            <div className="header">
                Chat With Pdf
            </div>

            <div className="pdf-upload">
                < FileUploader />
            </div>
            <div>
              < QuestionForm />
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default ChatUI;
