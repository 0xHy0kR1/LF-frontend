import React from "react";
import "./Footer.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <p>
            <FaMapMarkerAlt /> LIG-1252, Sector-8, Saddu, Raipur 492001
          </p>
          <p>
            <FaMapMarkerAlt /> SA 17, 2nd Floor, Lake City Mall, Thane West -
            400607
          </p>
          <p>
            <FaPhone /> 9076115135 / 9702237324
          </p>
          <p>
            <FaEnvelope /> kartikinteriors15@gmail.com
          </p>
        </div>
        <div className="footer-section footer-social">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Kartik Interiors. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
