import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PdfHistory.css';

function PdfHistory() {
  const [pdfHistory, setPDFHistory] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfId, setPdfId] = useState();
  const [t , setT] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8000/pdf-history/')
      .then(response => {
        setPDFHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching PDF history:', error);
      });
  }, [t]);
  const handlePDFClick = (pdf) => {
    setPdfId(pdf.id);
    console.log(t)
    axios.get(`http://localhost:8000/ask-question-withId/?pdfId=${pdf.id}`)
      .then(response => {
        localStorage.setItem('title',JSON.stringify(response.data.title))
        window.location.reload()
        console.log(t)
        console.log(response.data.message);
        console.log(response.data.title);
      })
      .catch(error => {
        console.error('Error fetching questions and answers:', error);
      });

      setT(()=>true)
      console.log("after catch",t)
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
