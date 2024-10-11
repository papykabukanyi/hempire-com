const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const pdfDocument = require("pdfkit");

require("dotenv").config(); // to load environment variables from .env file

// Function to generate PDF from form data
const generatePDF = (formData) => {
  const doc = new pdfDocument();
  const filePath = path.join(__dirname, "application.pdf");

  doc.fontSize(12).text(`Loan Application ID: 12345`, { align: "center" });
  doc.text(`Company Name: ${formData.companyName}`);
  doc.text(`Time in Business: ${formData.timeInBusiness}`);
  doc.text(`Company Email: ${formData.companyEmail}`);
  doc.text(`Company Phone: ${formData.companyPhone}`);
  doc.text(`EIN: ${formData.ein}`);
  doc.text(`Business Type: ${formData.businessType}`);
  
  // Borrower details
  doc.text(`Borrower First Name: ${formData.borrowerFirstName}`);
  doc.text(`Borrower Last Name: ${formData.borrowerLastName}`);
  doc.text(`Borrower DOB: ${formData.borrowerDOB}`);
  doc.text(`Borrower Ownership: ${formData.borrowerOwnership}`);
  doc.text(`Borrower SSN: ${formData.borrowerSSN}`);
  doc.text(`Borrower Phone: ${formData.borrowerPhone}`);
  doc.text(`Borrower Email: ${formData.borrowerEmail}`);
  doc.text(`Borrower Preferred Contact: ${formData.borrowerPreferredContact}`);

  // Co-applicant details (if provided)
  if (formData.coapplicantFirstName) {
    doc.text(`Co-applicant First Name: ${formData.coapplicantFirstName}`);
    doc.text(`Co-applicant Last Name: ${formData.coapplicantLastName}`);
    doc.text(`Co-applicant DOB: ${formData.coapplicantDOB}`);
    doc.text(`Co-applicant Ownership: ${formData.coapplicantOwnership}`);
    doc.text(`Co-applicant SSN: ${formData.coapplicantSSN}`);
    doc.text(`Co-applicant Phone: ${formData.coapplicantPhone}`);
    doc.text(`Co-applicant Email: ${formData.coapplicantEmail}`);
  }

  doc.text(`Loan Amount: ${formData.loanAmount}`);
  doc.text(`Max Down Payment: ${formData.maxDownPayment}`);
  doc.text(`Equipment & Seller Info: ${formData.equipmentSellerInfo}`);

  doc.end();
  
  // Write to a file
  doc.pipe(fs.createWriteStream(filePath));
  return filePath;
};

const sendEmail = async (borrowerEmail, borrowerName, formData, attachments) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address from .env
      pass: process.env.GMAIL_PASS, // Your Gmail app password from .env
    },
  });

  // Generate PDF for admin email
  const pdfPath = generatePDF(formData);

  // Email options for borrower confirmation
  const borrowerMailOptions = {
    from: process.env.GMAIL_USER,
    to: borrowerEmail,
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
            <p><strong>Application ID:</strong> 12345</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br>The Hempire Enterprise Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Hempire Enterprise. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  // Email options for admin (with PDF and attachments)
  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: [process.env.ADMIN_EMAIL1, process.env.ADMIN_EMAIL2], // Two admin emails from .env
    subject: `New Application Submission from ${borrowerName}`,
    text: `Application ID: 12345\nBorrower: ${borrowerName}`,
    attachments: [
      {
        filename: "application.pdf",
        path: pdfPath,
      },
      ...attachments.map((file) => ({
        filename: file.originalname,
        path: file.path,
      })),
    ],
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
