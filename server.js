const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI // Ensure you have the PostgreSQL connection URL here
});

// Create loan_applications table if it doesn't exist
const createTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS loan_applications (
       id SERIAL PRIMARY KEY,
       company_name VARCHAR(255),
       time_in_business VARCHAR(255),
       address_line1 VARCHAR(255),
       city VARCHAR(255),
       state VARCHAR(50),
       zip_code VARCHAR(50),
       company_email VARCHAR(255),
       company_phone VARCHAR(50),
       ein VARCHAR(50),
       business_type VARCHAR(100),
       borrower_first_name VARCHAR(255),
       borrower_last_name VARCHAR(255),
       borrower_dob DATE,
       borrower_ownership VARCHAR(50),
       borrower_ssn VARCHAR(50),
       borrower_phone VARCHAR(50),
       borrower_email VARCHAR(255),
       borrower_preferred_contact VARCHAR(50),
       borrower_address_line1 VARCHAR(255),
       borrower_city VARCHAR(255),
       borrower_state VARCHAR(50),
       borrower_zip_code VARCHAR(50),
       loan_amount VARCHAR(255),
       max_down_payment VARCHAR(255),
       equipment_seller_info TEXT,
       signature TEXT,
       coapplicant_first_name VARCHAR(255),
       coapplicant_last_name VARCHAR(255),
       coapplicant_dob DATE,
       coapplicant_ownership VARCHAR(50),
       coapplicant_ssn VARCHAR(50),
       coapplicant_phone VARCHAR(50),
       coapplicant_email VARCHAR(255),
       coapplicant_preferred_contact VARCHAR(50),
       coapplicant_address_line1 VARCHAR(255),
       coapplicant_city VARCHAR(255),
       coapplicant_state VARCHAR(50),
       coapplicant_zip_code VARCHAR(50)
   );
    `;

    try {
        await pool.query(query);
        console.log('Table "loan_applications" created or already exists.');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

createTable(); // Call this when server starts

// API route for handling form submissions
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
        coapplicantZipCode
    } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO loan_applications (company_name, time_in_business, address_line1, city, state, zip_code, company_email, company_phone, ein, business_type, borrower_first_name, borrower_last_name, borrower_dob, borrower_ownership, borrower_ssn, borrower_phone, borrower_email, borrower_preferred_contact, borrower_address_line1, borrower_city, borrower_state, borrower_zip_code, loan_amount, max_down_payment, equipment_seller_info, signature, coapplicant_first_name, coapplicant_last_name, coapplicant_dob, coapplicant_ownership, coapplicant_ssn, coapplicant_phone, coapplicant_email, coapplicant_preferred_contact, coapplicant_address_line1, coapplicant_city, coapplicant_state, coapplicant_zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35)',
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
                coapplicantZipCode
            ]
        );

        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).send('Error submitting form.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
