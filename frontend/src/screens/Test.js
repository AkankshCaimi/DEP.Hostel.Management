import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/test`);
        setPdfData(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching the PDF.');
      }
    };

    fetchPdf();
  }, []);

  const handleError = () => {
    // Handle error appropriately, e.g., display an error message to the user
    console.error(error);
  };

  const openPdfInNewTab = (idx,e) => {
    e.preventDefault();
    console.log(idx);
    if (pdfData) {
      const pdfUrls = [`data:application/pdf;base64,${pdfData.instiID}`, `data:application/pdf;base64,${pdfData.letter}`];
      window.open(pdfUrls[idx], '_blank');
    }
  };

  return (
    <div>
      {pdfData && (
        <div>
          <p>{pdfData.pdf_name}</p>
          <button onClick={(e)=>openPdfInNewTab(0,e)}>Open Institute Id</button>
          <button onClick={(e)=>openPdfInNewTab(1,e)}>Open Letter</button>
        </div>
      )}
      {error && handleError()}
    </div>
  );
};

export default MyComponent;
