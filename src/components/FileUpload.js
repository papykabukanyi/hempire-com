import React from 'react';

function FileUpload({ setFiles }) {
  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Store multiple files
  };

  return (
    <div>
      <h4>Upload Documents</h4>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;
