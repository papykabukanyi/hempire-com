const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (borrowerEmail, borrowerName, appId, attachments) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Email to borrower
  let borrowerMailOptions = {
    from: process.env.GMAIL_USER,
    to: borrowerEmail,
    subject: 'Application Submitted',
    html: `
      <div class="container">
        <div class="header">
            <img src="https://hempire-enterprise.com/static/assets/img/Logo.png" alt="Company Logo">
            <h2>Application Submitted</h2>
        </div>
        <div class="content">
            <p>Dear ${borrowerName},</p>
            <p>Thank you for submitting your application to Hempire Enterprise. We have received your application and our team is currently reviewing it.</p>
            <p><strong>Application ID:</strong> ${appId}</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br>The Hempire Enterprise Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Hempire Enterprise. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  // Email to admin
  let adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_EMAIL_1 + ',' + process.env.ADMIN_EMAIL_2, // Admins email from .env
    subject: `New Application Submission from ${borrowerName}`,
    text: `Application ID: ${appId}\nBorrower: ${borrowerName}`,
    attachments: attachments,
  };

  try {
    await transporter.sendMail(borrowerMailOptions);
    console.log('Borrower email sent successfully.');

    await transporter.sendMail(adminMailOptions);
    console.log('Admin email with application sent successfully.');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

module.exports = sendEmail;
