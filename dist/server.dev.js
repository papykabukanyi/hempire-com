"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('pg'),
    Pool = _require.Pool;

require('dotenv').config();

var app = express();
app.use(bodyParser.json());
var pool = new Pool({
  connectionString: process.env.POSTGRES_URI // Ensure you have the PostgreSQL connection URL here

}); // Create loan_applications table if it doesn't exist

var createTable = function createTable() {
  var query;
  return regeneratorRuntime.async(function createTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "\n    CREATE TABLE IF NOT EXISTS loan_applications (\n       id SERIAL PRIMARY KEY,\n       company_name VARCHAR(255),\n       time_in_business VARCHAR(255),\n       address_line1 VARCHAR(255),\n       city VARCHAR(255),\n       state VARCHAR(50),\n       zip_code VARCHAR(50),\n       company_email VARCHAR(255),\n       company_phone VARCHAR(50),\n       ein VARCHAR(50),\n       business_type VARCHAR(100),\n       borrower_first_name VARCHAR(255),\n       borrower_last_name VARCHAR(255),\n       borrower_dob DATE,\n       borrower_ownership VARCHAR(50),\n       borrower_ssn VARCHAR(50),\n       borrower_phone VARCHAR(50),\n       borrower_email VARCHAR(255),\n       borrower_preferred_contact VARCHAR(50),\n       borrower_address_line1 VARCHAR(255),\n       borrower_city VARCHAR(255),\n       borrower_state VARCHAR(50),\n       borrower_zip_code VARCHAR(50),\n       loan_amount VARCHAR(255),\n       max_down_payment VARCHAR(255),\n       equipment_seller_info TEXT,\n       signature TEXT,\n       coapplicant_first_name VARCHAR(255),\n       coapplicant_last_name VARCHAR(255),\n       coapplicant_dob DATE,\n       coapplicant_ownership VARCHAR(50),\n       coapplicant_ssn VARCHAR(50),\n       coapplicant_phone VARCHAR(50),\n       coapplicant_email VARCHAR(255),\n       coapplicant_preferred_contact VARCHAR(50),\n       coapplicant_address_line1 VARCHAR(255),\n       coapplicant_city VARCHAR(255),\n       coapplicant_state VARCHAR(50),\n       coapplicant_zip_code VARCHAR(50)\n   );\n    ";
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query(query));

        case 4:
          console.log('Table "loan_applications" created or already exists.');
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error('Error creating table:', _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

createTable(); // Call this when server starts
// API route for handling form submissions

app.post('/submit', function _callee(req, res) {
  var _req$body, companyName, timeInBusiness, addressLine1, city, state, zipCode, companyEmail, companyPhone, ein, businessType, borrowerFirstName, borrowerLastName, borrowerDOB, borrowerOwnership, borrowerSSN, borrowerPhone, borrowerEmail, borrowerPreferredContact, borrowerAddressLine1, borrowerCity, borrowerState, borrowerZipCode, loanAmount, maxDownPayment, equipmentSellerInfo, signature, coapplicantFirstName, coapplicantLastName, coapplicantDOB, coapplicantOwnership, coapplicantSSN, coapplicantPhone, coapplicantEmail, coapplicantPreferredContact, coapplicantAddressLine1, coapplicantCity, coapplicantState, coapplicantZipCode, result;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, companyName = _req$body.companyName, timeInBusiness = _req$body.timeInBusiness, addressLine1 = _req$body.addressLine1, city = _req$body.city, state = _req$body.state, zipCode = _req$body.zipCode, companyEmail = _req$body.companyEmail, companyPhone = _req$body.companyPhone, ein = _req$body.ein, businessType = _req$body.businessType, borrowerFirstName = _req$body.borrowerFirstName, borrowerLastName = _req$body.borrowerLastName, borrowerDOB = _req$body.borrowerDOB, borrowerOwnership = _req$body.borrowerOwnership, borrowerSSN = _req$body.borrowerSSN, borrowerPhone = _req$body.borrowerPhone, borrowerEmail = _req$body.borrowerEmail, borrowerPreferredContact = _req$body.borrowerPreferredContact, borrowerAddressLine1 = _req$body.borrowerAddressLine1, borrowerCity = _req$body.borrowerCity, borrowerState = _req$body.borrowerState, borrowerZipCode = _req$body.borrowerZipCode, loanAmount = _req$body.loanAmount, maxDownPayment = _req$body.maxDownPayment, equipmentSellerInfo = _req$body.equipmentSellerInfo, signature = _req$body.signature, coapplicantFirstName = _req$body.coapplicantFirstName, coapplicantLastName = _req$body.coapplicantLastName, coapplicantDOB = _req$body.coapplicantDOB, coapplicantOwnership = _req$body.coapplicantOwnership, coapplicantSSN = _req$body.coapplicantSSN, coapplicantPhone = _req$body.coapplicantPhone, coapplicantEmail = _req$body.coapplicantEmail, coapplicantPreferredContact = _req$body.coapplicantPreferredContact, coapplicantAddressLine1 = _req$body.coapplicantAddressLine1, coapplicantCity = _req$body.coapplicantCity, coapplicantState = _req$body.coapplicantState, coapplicantZipCode = _req$body.coapplicantZipCode;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO loan_applications (company_name, time_in_business, address_line1, city, state, zip_code, company_email, company_phone, ein, business_type, borrower_first_name, borrower_last_name, borrower_dob, borrower_ownership, borrower_ssn, borrower_phone, borrower_email, borrower_preferred_contact, borrower_address_line1, borrower_city, borrower_state, borrower_zip_code, loan_amount, max_down_payment, equipment_seller_info, signature, coapplicant_first_name, coapplicant_last_name, coapplicant_dob, coapplicant_ownership, coapplicant_ssn, coapplicant_phone, coapplicant_email, coapplicant_preferred_contact, coapplicant_address_line1, coapplicant_city, coapplicant_state, coapplicant_zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35)', [companyName, timeInBusiness, addressLine1, city, state, zipCode, companyEmail, companyPhone, ein, businessType, borrowerFirstName, borrowerLastName, borrowerDOB, borrowerOwnership, borrowerSSN, borrowerPhone, borrowerEmail, borrowerPreferredContact, borrowerAddressLine1, borrowerCity, borrowerState, borrowerZipCode, loanAmount, maxDownPayment, equipmentSellerInfo, signature, coapplicantFirstName, coapplicantLastName, coapplicantDOB, coapplicantOwnership, coapplicantSSN, coapplicantPhone, coapplicantEmail, coapplicantPreferredContact, coapplicantAddressLine1, coapplicantCity, coapplicantState, coapplicantZipCode]));

        case 4:
          result = _context2.sent;
          res.status(200).send('Form submitted successfully!');
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error('Error submitting form:', _context2.t0);
          res.status(500).send('Error submitting form.');

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});