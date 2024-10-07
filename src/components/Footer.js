import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-3 py-3">
            <h3>
              <img
                src="assets/img/Logo.png"
                alt="Equipment Financing for Your Business"
                style={{ height: 90, width: 160 }}
              />
            </h3>
            <p>
              We are able to finance any business-essential equipment with flexible loan options.
            </p>
            <p>Naisha@hempire-enterprise.com</p>
            <p>+1 425-296-8273</p>
          </div>
          <div className="col-lg-3 py-3">
            <h5>Quick Links</h5>
            <ul className="footer-menu">
              <li><a href="/question">Resources</a></li>
              <li><a href="/contact">Report an issue</a></li>
            </ul>
          </div>
          <div className="col-lg-3 py-3">
            <h5>About Us</h5>
            <ul className="footer-menu">
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>
          <div className="col-lg-3 py-3">
            <div className="sosmed-button mt-4">
              <a href="https://www.linkedin.com/company/hempire-enterprise">
                <span className="mai-logo-linkedin"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
