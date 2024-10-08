"use strict";

var nodemailer = require('nodemailer');

require('dotenv').config();

var sendEmail = function sendEmail(borrowerEmail, borrowerName, appId, attachments) {
  var transporter, borrowerMailOptions, adminMailOptions;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS
            }
          }); // Email to borrower

          borrowerMailOptions = {
            from: process.env.GMAIL_USER,
            to: borrowerEmail,
            subject: 'Application Submitted',
            html: "\n      <div class=\"container\">\n        <div class=\"header\">\n            <img src=\"https://hempire-enterprise.com/static/assets/img/Logo.png\" alt=\"Company Logo\">\n            <h2>Application Submitted</h2>\n        </div>\n        <div class=\"content\">\n            <p>Dear ".concat(borrowerName, ",</p>\n            <p>Thank you for submitting your application to Hempire Enterprise. We have received your application and our team is currently reviewing it.</p>\n            <p><strong>Application ID:</strong> ").concat(appId, "</p>\n            <p>If you have any questions, feel free to reply to this email.</p>\n            <p>Best regards,<br>The Hempire Enterprise Team</p>\n        </div>\n        <div class=\"footer\">\n            <p>&copy; 2024 Hempire Enterprise. All rights reserved.</p>\n        </div>\n      </div>\n    ")
          }; // Email to admin

          adminMailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.ADMIN_EMAIL_1 + ',' + process.env.ADMIN_EMAIL_2,
            // Admins email from .env
            subject: "New Application Submission from ".concat(borrowerName),
            text: "Application ID: ".concat(appId, "\nBorrower: ").concat(borrowerName),
            attachments: attachments
          };
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(transporter.sendMail(borrowerMailOptions));

        case 6:
          console.log('Borrower email sent successfully.');
          _context.next = 9;
          return regeneratorRuntime.awrap(transporter.sendMail(adminMailOptions));

        case 9:
          console.log('Admin email with application sent successfully.');
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error('Error sending emails:', _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
};

module.exports = sendEmail;