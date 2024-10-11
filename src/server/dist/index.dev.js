"use strict";

require('dotenv').config();

var express = require('express');

var cors = require('cors');

var _require = require('pg'),
    Pool = _require.Pool; // Setup Express


var app = express();
app.use(cors());
app.use(express.json()); // PostgreSQL connection

var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Use the Railway Postgres URL here
  ssl: {
    rejectUnauthorized: false // Required for Railway DBs with SSL

  }
}); // Submit form

app.post('/submit', function _callee(req, res) {
  var _req$body, companyName, timeInBusiness, addressLine1, city, state, zipCode, companyEmail, companyPhone, ein, businessType, borrowerFirstName, borrowerLastName, borrowerDOB, borrowerOwnership, borrowerSSN, borrowerPhone, borrowerEmail, borrowerPreferredContact, borrowerAddressLine1, borrowerCity, borrowerState, borrowerZipCode, loanAmount, maxDownPayment, equipmentSellerInfo, signature, coapplicantFirstName, coapplicantLastName, coapplicantDOB, coapplicantOwnership, coapplicantSSN, coapplicantPhone, coapplicantEmail, coapplicantPreferredContact, coapplicantAddressLine1, coapplicantCity, coapplicantState, coapplicantZipCode;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, companyName = _req$body.companyName, timeInBusiness = _req$body.timeInBusiness, addressLine1 = _req$body.addressLine1, city = _req$body.city, state = _req$body.state, zipCode = _req$body.zipCode, companyEmail = _req$body.companyEmail, companyPhone = _req$body.companyPhone, ein = _req$body.ein, businessType = _req$body.businessType, borrowerFirstName = _req$body.borrowerFirstName, borrowerLastName = _req$body.borrowerLastName, borrowerDOB = _req$body.borrowerDOB, borrowerOwnership = _req$body.borrowerOwnership, borrowerSSN = _req$body.borrowerSSN, borrowerPhone = _req$body.borrowerPhone, borrowerEmail = _req$body.borrowerEmail, borrowerPreferredContact = _req$body.borrowerPreferredContact, borrowerAddressLine1 = _req$body.borrowerAddressLine1, borrowerCity = _req$body.borrowerCity, borrowerState = _req$body.borrowerState, borrowerZipCode = _req$body.borrowerZipCode, loanAmount = _req$body.loanAmount, maxDownPayment = _req$body.maxDownPayment, equipmentSellerInfo = _req$body.equipmentSellerInfo, signature = _req$body.signature, coapplicantFirstName = _req$body.coapplicantFirstName, coapplicantLastName = _req$body.coapplicantLastName, coapplicantDOB = _req$body.coapplicantDOB, coapplicantOwnership = _req$body.coapplicantOwnership, coapplicantSSN = _req$body.coapplicantSSN, coapplicantPhone = _req$body.coapplicantPhone, coapplicantEmail = _req$body.coapplicantEmail, coapplicantPreferredContact = _req$body.coapplicantPreferredContact, coapplicantAddressLine1 = _req$body.coapplicantAddressLine1, coapplicantCity = _req$body.coapplicantCity, coapplicantState = _req$body.coapplicantState, coapplicantZipCode = _req$body.coapplicantZipCode;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO applications (company_name, time_in_business, address_line_1, city, state, zip_code, company_email, company_phone, ein, business_type, borrower_first_name, borrower_last_name, borrower_dob, borrower_ownership, borrower_ssn, borrower_phone, borrower_email, borrower_preferred_contact, borrower_address_line_1, borrower_city, borrower_state, borrower_zip_code, loan_amount, max_down_payment, equipment_seller_info, signature, coapplicant_first_name, coapplicant_last_name, coapplicant_dob, coapplicant_ownership, coapplicant_ssn, coapplicant_phone, coapplicant_email, coapplicant_preferred_contact, coapplicant_address_line_1, coapplicant_city, coapplicant_state, coapplicant_zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35)', [companyName, timeInBusiness, addressLine1, city, state, zipCode, companyEmail, companyPhone, ein, businessType, borrowerFirstName, borrowerLastName, borrowerDOB, borrowerOwnership, borrowerSSN, borrowerPhone, borrowerEmail, borrowerPreferredContact, borrowerAddressLine1, borrowerCity, borrowerState, borrowerZipCode, loanAmount, maxDownPayment, equipmentSellerInfo, signature, coapplicantFirstName, coapplicantLastName, coapplicantDOB, coapplicantOwnership, coapplicantSSN, coapplicantPhone, coapplicantEmail, coapplicantPreferredContact, coapplicantAddressLine1, coapplicantCity, coapplicantState, coapplicantZipCode]));

        case 4:
          res.status(200).send('Form submission successful!');
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error('Error saving form data:', _context.t0);
          res.status(500).send('Error submitting form.');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
app.listen(5000, function () {
  console.log('Server is running on http://localhost:5000');
});