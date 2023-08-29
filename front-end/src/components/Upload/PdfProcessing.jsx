import React, { useState } from 'react';
import axios from 'axios';

const PdfProcessing = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadAndProcess = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      // Upload PDF for processing
      const response = await axios.post('/api/upload/pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Process the uploaded PDF
      const processingResponse = await axios.post('/api/process/pdf', {
        pdfId: response.data.pdfId
      });

      // Handle processing response
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUploadAndProcess}>Upload and Process PDF</button>
    </div>
  );
};

export default PdfProcessing;
