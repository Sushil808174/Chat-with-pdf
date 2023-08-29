import React from 'react';

const PdfHistory = ({ pdfDocuments }) => {
  return (
    <div>
      <h2>PDF History</h2>
      <ul>
        {pdfDocuments.map((pdf, index) => (
          <li key={index}>
            Title: {pdf.title}, Uploaded By: {pdf.uploadedBy.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfHistory;
