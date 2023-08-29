import React, { useState, useRef } from 'react';
import axios from 'axios';
import './FileUploader.css'

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Use useRef to create a ref

  const handleDrop = event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    console.log(file)
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(formData)
      axios.post('/api/upload/', formData)
        .then(response => {
          // Handle successful upload
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div className="file-uploader">
      <div
        className="file-drop-area"
        onDrop={handleDrop}
        onDragOver={event => event.preventDefault()}
        onDragEnter={event => event.preventDefault()}
        onClick={() => fileInputRef.current.click()}
      >
        Drag and drop a file here
      </div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button className='upload-btn' onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUploader;
