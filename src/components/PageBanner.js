import React from "react";

const PageBanner = ({ title, description, image }) => {
  return (
    <div className="page-banner home-banner">
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-lg-6 py-3">
            <h1 className="mb-4">{title}</h1>
            <p className="text-lg mb-5">{description}</p>
            <a href="/form" className="btn btn-primary">Apply Now</a>
          </div>
          <div className="col-lg-6 py-3">
            <div className="img-place">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
