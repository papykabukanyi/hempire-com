require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the Railway Postgres URL here
  ssl: {
    rejectUnauthorized: false, // Required for Railway DBs with SSL
  },
});

// Submit form
app.post('/submit', async (req, res) => {
  const {
    companyName,
    timeInBusiness,
    addressLine1,
    city,
    state,
    zipCode,
    companyEmail,
    companyPhone,
    ein,
    businessType,
    borrowerFirstName,
    borrowerLastName,
    borrowerDOB,
    borrowerOwnership,
    borrowerSSN,
    borrowerPhone,
    borrowerEmail,
    borrowerPreferredContact,
    borrowerAddressLine1,
    borrowerCity,
    borrowerState,
    borrowerZipCode,
    loanAmount,
    maxDownPayment,
    equipmentSellerInfo,
    signature,
    coapplicantFirstName,
    coapplicantLastName,
    coapplicantDOB,
    coapplicantOwnership,
    coapplicantSSN,
    coapplicantPhone,
    coapplicantEmail,
    coapplicantPreferredContact,
    coapplicantAddressLine1,
    coapplicantCity,
    coapplicantState,
    coapplicantZipCode,
  } = req.body;

  try {
    await pool.query(
      'INSERT INTO applications (company_name, time_in_business, address_line_1, city, state, zip_code, company_email, company_phone, ein, business_type, borrower_first_name, borrower_last_name, borrower_dob, borrower_ownership, borrower_ssn, borrower_phone, borrower_email, borrower_preferred_contact, borrower_address_line_1, borrower_city, borrower_state, borrower_zip_code, loan_amount, max_down_payment, equipment_seller_info, signature, coapplicant_first_name, coapplicant_last_name, coapplicant_dob, coapplicant_ownership, coapplicant_ssn, coapplicant_phone, coapplicant_email, coapplicant_preferred_contact, coapplicant_address_line_1, coapplicant_city, coapplicant_state, coapplicant_zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35)',
      [
        companyName,
        timeInBusiness,
        addressLine1,
        city,
        state,
        zipCode,
        companyEmail,
        companyPhone,
        ein,
        businessType,
        borrowerFirstName,
        borrowerLastName,
        borrowerDOB,
        borrowerOwnership,
        borrowerSSN,
        borrowerPhone,
        borrowerEmail,
        borrowerPreferredContact,
        borrowerAddressLine1,
        borrowerCity,
        borrowerState,
        borrowerZipCode,
        loanAmount,
        maxDownPayment,
        equipmentSellerInfo,
        signature,
        coapplicantFirstName,
        coapplicantLastName,
        coapplicantDOB,
        coapplicantOwnership,
        coapplicantSSN,
        coapplicantPhone,
        coapplicantEmail,
        coapplicantPreferredContact,
        coapplicantAddressLine1,
        coapplicantCity,
        coapplicantState,
        coapplicantZipCode,
      ]
    );

    res.status(200).send('Form submission successful!');
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Error submitting form.');
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
