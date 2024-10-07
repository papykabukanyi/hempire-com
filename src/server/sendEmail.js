const nodemailer = require("nodemailer");
require("dotenv").config(); // to use .env for SMTP credentials

const sendEmail = async (borrowerEmail, borrowerName, appId, formDataToSend) => {
  // Create a transporter object using Gmail's SMTP service
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address from .env
      pass: process.env.GMAIL_PASS, // Your Gmail app password from .env
    },
  });

  // Email to the borrower
  let borrowerMailOptions = {
    from: process.env.GMAIL_USER,
    to: borrowerEmail, // Send to the borrower email
    subject: "Application Submitted",
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

  // Email to the admin (with PDF and any attachments)
  let adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Admin email from .env
    subject: `New Application Submission from ${borrowerName}`,
    text: `Application ID: ${appId}\nBorrower: ${borrowerName}`,
    attachments: [...formDataToSend],
  };

  try {
    // Send email to borrower
    await transporter.sendMail(borrowerMailOptions);
    console.log("Borrower email sent successfully.");

    // Send email to admin with PDF and attachments
    await transporter.sendMail(adminMailOptions);
    console.log("Admin email with application sent successfully.");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

module.exports = sendEmail;
