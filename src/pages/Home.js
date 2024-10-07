import React from "react";
import PageBanner from "../components/PageBanner";

const Home = () => {
  return (
    <div>
      <PageBanner
        title="NEED FINANCING FOR YOUR BUSINESS?"
        description="Hempire Enterprise is your ONE STOP SHOP Small Business Finance Partner!"
        image="assets/img/machinery.png"
      />
      <section className="page-section features">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
              <h5>TOTAL SOLUTION FINANCING</h5>
              <p>Affordable 100% financing allows your customers to finance all of their equipment...</p>
            </div>
            <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
              <h5>SIMPLE & CONVENIENT</h5>
              <p>Fast application and documentation process. Quick 24-48 hours application updates...</p>
            </div>
            {/* Repeat similar blocks */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
