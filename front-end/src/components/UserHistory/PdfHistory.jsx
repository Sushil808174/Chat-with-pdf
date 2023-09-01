import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PdfHistory.css';

function PdfHistory() {
  const [pdfHistory, setPDFHistory] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfId, setPdfId] = useState();
  
  useEffect(() => {
    axios.get('http://localhost:8000/pdf-history/')
      .then(response => {
        setPDFHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching PDF history:', error);
      });
  }, []);
  const handlePDFClick = (pdf) => {
    setPdfId(pdf.id);
    axios.get(`http://localhost:8000/ask-question-withId/?pdfId=${pdf.id}`)
      .then(response => {
        localStorage.setItem('title',JSON.stringify(response.data.title))
        console.log(response.data.message);
        console.log(response.data.title);
      })
      .catch(error => {
        console.error('Error fetching questions and answers:', error);
      });
  };


  return (
    <div className="pdfhistory">
      {/* <h2>PDF History</h2> */}
      {pdfHistory.map((entry, index) => (
        <div key={entry.id} onClick={() => handlePDFClick(entry)} className="eachPdf">
          <p>{entry.title}</p>
          {/* Add more details about the PDF if needed */}
        </div>
      ))}
    </div>
  );
}

export default PdfHistory;
