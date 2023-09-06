import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './FileUploader.css'

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [val,setVal] = useState('')
  
  useEffect(()=>{
    setVal(()=>JSON.parse(localStorage.getItem('title')))
    
  },[])

  useEffect(()=>{
    
    console.log(1)
  },[])



  const fileInputRef = useRef(null); // Use useRef to create a ref

  const handleDrop = event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setVal(file.name)
    console.log(file)
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setVal(file.name)
    setSelectedFile(file);
  };
  const Value=()=>{
    
      if(val){
        return val;
      }else{
        return "Drag and drop a file here"
      }
    
  }

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title',val)
      console.log(selectedFile)
      axios.post('http://localhost:8000/upload-pdf/', formData)
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
        <Value />
        
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
