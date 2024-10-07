const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Configure the Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Gmail address from .env
    pass: process.env.GMAIL_PASS, // Gmail app-specific password from .env
  },
});

// Route to handle form submission, file upload, and email sending
app.post('/submit', upload.any(), async (req, res) => {
  const { borrowerEmail, borrowerName, appId } = req.body;

  // Generate PDF (you can customize this part as needed)
  const pdfFilePath = path.join(__dirname, 'uploads', `${appId}_application.pdf`);
  fs.writeFileSync(pdfFilePath, 'Sample PDF content'); // Dummy PDF content, replace with real generated PDF

  const attachments = [
    {
      filename: `${appId}_application.pdf`,
      path: pdfFilePath,
    },
    ...req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    })),
  ];

  // Send email to the borrower
  const borrowerMailOptions = {
    from: process.env.GMAIL_USER,
    to: borrowerEmail,
    subject: 'Your Application has been Submitted',
    html: `
      <p>Dear ${borrowerName},</p>
      <p>Thank you for submitting your application to Hempire Enterprise. We have received your application.</p>
      <p><strong>Application ID:</strong> ${appId}</p>
      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>The Hempire Enterprise Team</p>
    `,
  };

  // Send email to the admin with attached PDF and uploaded files
  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Admin email from .env
    subject: `New Application Submission from ${borrowerName}`,
    text: `Application ID: ${appId}\nBorrower: ${borrowerName}`,
    attachments,
  };

  try {
    // Send email to borrower
    await transporter.sendMail(borrowerMailOptions);

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending emails');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
