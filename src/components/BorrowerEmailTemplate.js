import React from 'react';

const BorrowerEmailTemplate = ({ borrowerName, appId }) => {
  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <div className="header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="https://hempire-enterprise.com/static/assets/img/Logo.png" alt="Company Logo" style={{ maxWidth: '150px' }} />
        <h2>Application Submitted</h2>
      </div>
      <div className="content" style={{ marginBottom: '20px' }}>
        <p>Dear {borrowerName},</p>
        <p>Thank you for submitting your application to Hempire Enterprise. We have received your application and our team is currently reviewing it.</p>
        <p><strong>Application ID:</strong> {appId}</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br />The Hempire Enterprise Team</p>
      </div>
      <div className="footer" style={{ textAlign: 'center', fontSize: '12px', color: '#777' }}>
        <p>&copy; 2024 Hempire Enterprise. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BorrowerEmailTemplate;
