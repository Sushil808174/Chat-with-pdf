import React, { useState } from 'react';
import axios from 'axios';

const PdfUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('/api/upload/pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Handle response
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
};

export default PdfUpload;
