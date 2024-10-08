import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload'; // Component for file uploads
import SignaturePad from './SignaturePad'; // Component for signature capture
import Agreement from './Agreement'; // Component for agreement checkbox
import InputMask from 'react-input-mask'; // For SSN and EIN masking
import jsPDF from 'jspdf'; // For generating PDFs

function Form() {
  const [formData, setFormData] = useState({
    companyName: '',
    timeInBusiness: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    companyEmail: '',
    companyPhone: '',
    ein: '',
    businessType: '',
    borrowerFirstName: '',
    borrowerLastName: '',
    borrowerDOB: '',
    borrowerOwnership: '',
    borrowerSSN: '',
    borrowerPhone: '',
    borrowerEmail: '',
    borrowerPreferredContact: '',
    borrowerAddressLine1: '',
    borrowerCity: '',
    borrowerState: '',
    borrowerZipCode: '',
    loanAmount: '',
    maxDownPayment: '',
    equipmentSellerInfo: '',
    signature: '',
    coapplicantFirstName: '',
    coapplicantLastName: '',
    coapplicantDOB: '',
    coapplicantOwnership: '',
    coapplicantSSN: '',
    coapplicantPhone: '',
    coapplicantEmail: '',
    coapplicantPreferredContact: '',
    coapplicantAddressLine1: '',
    coapplicantCity: '',
    coapplicantState: '',
    coapplicantZipCode: '',
  });

  const [files, setFiles] = useState([]); // Store uploaded files
  const [additionalFiles, setAdditionalFiles] = useState([]); // Additional files state
  const [signature, setSignature] = useState(''); // Store signature
  const [agreementChecked, setAgreementChecked] = useState(false); // Agreement checkbox state

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'borrowerOwnership' || name === 'coapplicantOwnership') {
      setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, '') + '%' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add more files function to handle additional uploads
  const addMoreFiles = (e) => {
    const newFiles = [...additionalFiles, ...e.target.files];
    setAdditionalFiles(newFiles);
  };

  // PDF generation
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Loan Application Form', 10, 10);
    doc.text(`Company Name: ${formData.companyName}`, 10, 20);
    doc.text(`Borrower Name: ${formData.borrowerFirstName} ${formData.borrowerLastName}`, 10, 30);
    doc.text(`Borrower Email: ${formData.borrowerEmail}`, 10, 40);
    doc.text(`Business Type: ${formData.businessType}`, 10, 50);
    doc.text(`Loan Amount: ${formData.loanAmount}`, 10, 60);
    doc.text(`Max Down Payment: ${formData.maxDownPayment}`, 10, 70);
    // Add more fields as needed
    return doc.output('blob'); // Returns PDF blob
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!agreementChecked) {
      alert('You must agree to the terms and conditions before submitting.');
      return;
    }

    const pdfBlob = generatePDF();
    const formDataToSend = {
      borrowerEmail: formData.borrowerEmail,
      borrowerName: `${formData.borrowerFirstName} ${formData.borrowerLastName}`,
      appId: '12345', // Sample application ID
      attachments: [...files, ...additionalFiles].map((file) => ({
        name: file.name,
        content: file.base64,
      })),
    };

    try {
      const response = await axios.post('http://localhost:5000/send-email', {
        ...formDataToSend,
        attachments: [
          { name: 'application.pdf', content: await pdfBlob.text() },
          ...formDataToSend.attachments,
        ],
      });

      if (response.status === 200) {
        alert('Application submitted successfully!');
      } else {
        alert('Failed to submit the application.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="container">
      <h3>Loan Application Form</h3>
      <form onSubmit={handleFormSubmit}>
        {/* Business Information Section */}
        <h4>Business Information</h4>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
            <label>Company Name*</label>
          </div>
          <div className="input-data">
            <input
              type="number"
              name="timeInBusiness"
              value={formData.timeInBusiness}
              onChange={handleInputChange}
              required
            />
            <label>Time in Business*</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              required
            />
            <label>Address Line 1*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <label>City*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
            <label>State*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
            <label>Zip Code*</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              required
            />
            <label>Company Email*</label>
          </div>
          <div className="input-data">
            <input
              type="tel"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleInputChange}
              required
            />
            <label>Company Phone*</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <InputMask
              mask="99-9999999"
              value={formData.ein}
              onChange={handleInputChange}
            >
              {(inputProps) => <input {...inputProps} type="text" name="ein" required />}
            </InputMask>
            <label>EIN / TAX ID Number*</label>
          </div>
          <div className="input-data">
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type of Business</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Corporation">Corporation</option>
              <option value="LLC">LLC</option>
              <option value="Partnership">Partnership</option>
            </select>
            <label>Business Type*</label>
          </div>
        </div>

        {/* Borrower Information Section */}
        <h4>Borrower Information</h4>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="borrowerFirstName"
              value={formData.borrowerFirstName}
              onChange={handleInputChange}
              required
            />
            <label>First Name*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="borrowerLastName"
              value={formData.borrowerLastName}
              onChange={handleInputChange}
              required
            />
            <label>Last Name*</label>
          </div>
          <div className="input-data">
            <input
              type="date"
              name="borrowerDOB"
              value={formData.borrowerDOB}
              onChange={handleInputChange}
              required
            />
            <label>Date of Birth*</label>
          </div>
        </div>

        {/* Borrower Address */}
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="borrowerAddressLine1"
              value={formData.borrowerAddressLine1}
              onChange={handleInputChange}
              required
            />
            <label>Address Line 1*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="borrowerCity"
              value={formData.borrowerCity}
              onChange={handleInputChange}
              required
            />
            <label>City*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="borrowerState"
              value={formData.borrowerState}
              onChange={handleInputChange}
              required
            />
            <label>State*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="borrowerZipCode"
              value={formData.borrowerZipCode}
              onChange={handleInputChange}
              required
            />
            <label>Zip Code*</label>
          </div>
        </div>

        {/* More Borrower Fields */}
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="borrowerOwnership"
              value={formData.borrowerOwnership}
              onChange={handleInputChange}
              required
            />
            <label>Percent Ownership*</label>
          </div>
          <div className="input-data">
            <InputMask
              mask="999-99-9999"
              value={formData.borrowerSSN}
              onChange={handleInputChange}
            >
              {(inputProps) => <input {...inputProps} type="text" name="borrowerSSN" required />}
            </InputMask>
            <label>Social Security Number*</label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <input
              type="tel"
              name="borrowerPhone"
              value={formData.borrowerPhone}
              onChange={handleInputChange}
              required
            />
            <label>Cell Phone*</label>
          </div>
          <div className="input-data">
            <input
              type="email"
              name="borrowerEmail"
              value={formData.borrowerEmail}
              onChange={handleInputChange}
              required
            />
            <label>Email Address*</label>
          </div>
          <div className="input-data">
            <select
              name="borrowerPreferredContact"
              value={formData.borrowerPreferredContact}
              onChange={handleInputChange}
              required
            >
              <option value="">Method of Contact*</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <label>Preferred Method of Contact*</label>
          </div>
        </div>

        {/* Co-Applicant Information */}
        <h4>Co-Applicant Information (Optional)</h4>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="coapplicantFirstName"
              value={formData.coapplicantFirstName}
              onChange={handleInputChange}
            />
            <label>First Name</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="coapplicantLastName"
              value={formData.coapplicantLastName}
              onChange={handleInputChange}
            />
            <label>Last Name</label>
          </div>
          <div className="input-data">
            <input
              type="date"
              name="coapplicantDOB"
              value={formData.coapplicantDOB}
              onChange={handleInputChange}
            />
            <label>Date of Birth</label>
          </div>
        </div>

        {/* Co-Applicant Address */}
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="coapplicantAddressLine1"
              value={formData.coapplicantAddressLine1}
              onChange={handleInputChange}
            />
            <label>Address Line 1</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="coapplicantCity"
              value={formData.coapplicantCity}
              onChange={handleInputChange}
            />
            <label>City</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="coapplicantState"
              value={formData.coapplicantState}
              onChange={handleInputChange}
            />
            <label>State</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="coapplicantZipCode"
              value={formData.coapplicantZipCode}
              onChange={handleInputChange}
            />
            <label>Zip Code</label>
          </div>
        </div>

        {/* More Co-Applicant Fields */}
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="coapplicantOwnership"
              value={formData.coapplicantOwnership}
              onChange={handleInputChange}
            />
            <label>Percent Ownership</label>
          </div>
          <div className="input-data">
            <InputMask
              mask="999-99-9999"
              value={formData.coapplicantSSN}
              onChange={handleInputChange}
            >
              {(inputProps) => <input {...inputProps} type="text" name="coapplicantSSN" />}
            </InputMask>
            <label>Social Security Number</label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <input
              type="tel"
              name="coapplicantPhone"
              value={formData.coapplicantPhone}
              onChange={handleInputChange}
            />
            <label>Cell Phone</label>
          </div>
          <div className="input-data">
            <input
              type="email"
              name="coapplicantEmail"
              value={formData.coapplicantEmail}
              onChange={handleInputChange}
            />
            <label>Email Address</label>
          </div>
          <div className="input-data">
            <select
              name="coapplicantPreferredContact"
              value={formData.coapplicantPreferredContact}
              onChange={handleInputChange}
            >
              <option value="">Method of Contact</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <label>Preferred Method of Contact</label>
          </div>
        </div>

        {/* Loan Request Information */}
        <h4>Loan Request Information</h4>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              required
            />
            <label>Amount of Equipment*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="maxDownPayment"
              value={formData.maxDownPayment}
              onChange={handleInputChange}
              required
            />
            <label>Max Down Payment*</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="equipmentSellerInfo"
              value={formData.equipmentSellerInfo}
              onChange={handleInputChange}
              required
            />
            <label>Equipment & Seller Info*</label>
          </div>
        </div>

        {/* File Upload and Signature */}
        <FileUpload setFiles={setFiles} />
        <div>
          <label>Add More Documents:</label>
          <input type="file" multiple onChange={addMoreFiles} />
        </div>

        <SignaturePad setSignature={setSignature} />
        <Agreement setAgreementChecked={setAgreementChecked} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
