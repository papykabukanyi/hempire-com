import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light navbar-float">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="assets/img/Logo.png" alt="Hempire Enterprise" style={{ height: 85, width: 160 }} />
          </Link>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarContent">
            <ul className="navbar-nav ml-lg-4 pt-3 pt-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/question" className="nav-link">Q&A</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
            <div className="ml-auto">
              <Link to="/contact" className="btn btn-outline ml-2">Request Call</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
