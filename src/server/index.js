const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(bodyParser.json());

// Email sending route
app.post('/send-email', async (req, res) => {
  const { borrowerEmail, borrowerName, appId, formDataToSend, attachments } = req.body;

  try {
    // Setup Nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Borrower Email
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

    // Admin Email
    let adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAILS.split(','), // Multiple admin emails
      subject: `New Application Submission from ${borrowerName}`,
      text: `Application ID: ${appId}\nBorrower: ${borrowerName}`,
      attachments: attachments.map((file) => ({
        filename: file.name,
        content: Buffer.from(file.content, 'base64'), // Convert base64 to binary
      })),
    };

    // Send emails
    await transporter.sendMail(borrowerMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).send('Emails sent successfully.');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending emails.');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
