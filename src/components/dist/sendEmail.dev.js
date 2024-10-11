"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var nodemailer = require("nodemailer");

var fs = require("fs");

var path = require("path");

var pdfDocument = require("pdfkit");

require("dotenv").config(); // to load environment variables from .env file
// Function to generate PDF from form data


var generatePDF = function generatePDF(formData) {
  var doc = new pdfDocument();
  var filePath = path.join(__dirname, "application.pdf");
  doc.fontSize(12).text("Loan Application ID: 12345", {
    align: "center"
  });
  doc.text("Company Name: ".concat(formData.companyName));
  doc.text("Time in Business: ".concat(formData.timeInBusiness));
  doc.text("Company Email: ".concat(formData.companyEmail));
  doc.text("Company Phone: ".concat(formData.companyPhone));
  doc.text("EIN: ".concat(formData.ein));
  doc.text("Business Type: ".concat(formData.businessType)); // Borrower details

  doc.text("Borrower First Name: ".concat(formData.borrowerFirstName));
  doc.text("Borrower Last Name: ".concat(formData.borrowerLastName));
  doc.text("Borrower DOB: ".concat(formData.borrowerDOB));
  doc.text("Borrower Ownership: ".concat(formData.borrowerOwnership));
  doc.text("Borrower SSN: ".concat(formData.borrowerSSN));
  doc.text("Borrower Phone: ".concat(formData.borrowerPhone));
  doc.text("Borrower Email: ".concat(formData.borrowerEmail));
  doc.text("Borrower Preferred Contact: ".concat(formData.borrowerPreferredContact)); // Co-applicant details (if provided)

  if (formData.coapplicantFirstName) {
    doc.text("Co-applicant First Name: ".concat(formData.coapplicantFirstName));
    doc.text("Co-applicant Last Name: ".concat(formData.coapplicantLastName));
    doc.text("Co-applicant DOB: ".concat(formData.coapplicantDOB));
    doc.text("Co-applicant Ownership: ".concat(formData.coapplicantOwnership));
    doc.text("Co-applicant SSN: ".concat(formData.coapplicantSSN));
    doc.text("Co-applicant Phone: ".concat(formData.coapplicantPhone));
    doc.text("Co-applicant Email: ".concat(formData.coapplicantEmail));
  }

  doc.text("Loan Amount: ".concat(formData.loanAmount));
  doc.text("Max Down Payment: ".concat(formData.maxDownPayment));
  doc.text("Equipment & Seller Info: ".concat(formData.equipmentSellerInfo));
  doc.end(); // Write to a file

  doc.pipe(fs.createWriteStream(filePath));
  return filePath;
};

var sendEmail = function sendEmail(borrowerEmail, borrowerName, formData, attachments) {
  var transporter, pdfPath, borrowerMailOptions, adminMailOptions;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAIL_USER,
              // Your Gmail address from .env
              pass: process.env.GMAIL_PASS // Your Gmail app password from .env

            }
          }); // Generate PDF for admin email

          pdfPath = generatePDF(formData); // Email options for borrower confirmation

          borrowerMailOptions = {
            from: process.env.GMAIL_USER,
            to: borrowerEmail,
            subject: "Application Submitted",
            html: "\n      <div class=\"container\">\n        <div class=\"header\">\n            <img src=\"https://hempire-enterprise.com/static/assets/img/Logo.png\" alt=\"Company Logo\">\n            <h2>Application Submitted</h2>\n        </div>\n        <div class=\"content\">\n            <p>Dear ".concat(borrowerName, ",</p>\n            <p>Thank you for submitting your application to Hempire Enterprise. We have received your application and our team is currently reviewing it.</p>\n            <p><strong>Application ID:</strong> 12345</p>\n            <p>If you have any questions, feel free to reply to this email.</p>\n            <p>Best regards,<br>The Hempire Enterprise Team</p>\n        </div>\n        <div class=\"footer\">\n            <p>&copy; 2024 Hempire Enterprise. All rights reserved.</p>\n        </div>\n      </div>\n    ")
          }; // Email options for admin (with PDF and attachments)

          adminMailOptions = {
            from: process.env.GMAIL_USER,
            to: [process.env.ADMIN_EMAIL1, process.env.ADMIN_EMAIL2],
            // Two admin emails from .env
            subject: "New Application Submission from ".concat(borrowerName),
            text: "Application ID: 12345\nBorrower: ".concat(borrowerName),
            attachments: [{
              filename: "application.pdf",
              path: pdfPath
            }].concat(_toConsumableArray(attachments.map(function (file) {
              return {
                filename: file.originalname,
                path: file.path
              };
            })))
          };
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(transporter.sendMail(borrowerMailOptions));

        case 7:
          console.log("Borrower email sent successfully."); // Send email to admin with PDF and attachments

          _context.next = 10;
          return regeneratorRuntime.awrap(transporter.sendMail(adminMailOptions));

        case 10:
          console.log("Admin email with application sent successfully.");
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](4);
          console.error("Error sending emails:", _context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 13]]);
};

module.exports = sendEmail;