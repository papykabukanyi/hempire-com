import React from 'react';

const Agreement = ({ setAgreementChecked }) => {
  const handleAgreementChange = (e) => {
    setAgreementChecked(e.target.checked); // Check if the agreement is accepted
  };

  return (
    <div>
      <h4>Agreements</h4>
      <div>
        <input type="checkbox" id="agree" onChange={handleAgreementChange} required />
        <label htmlFor="agree">
          Additional information may be required based on time in business, credit standing, and more. 
          By submitting, you certify that all provided information is accurate and complete.
        </label>
      </div>
    </div>
  );
};

export default Agreement;
