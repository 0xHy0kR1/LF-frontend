import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css"
import glassPartitions from "../../assets/videos/clip1.mp4";
import wallPanels from "../../assets/videos/clip2.mp4";
import officeInteriors from "../../assets/videos/clip3.mp4";
// import clip4 from "../../assets/videos/clip4.mp4";
// import clip5 from "../../assets/videos/clip5.mp4";
// import clip6 from "../../assets/videos/clip6.mp4";
// import clip7 from "../../assets/videos/clip7.mp4";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaGoogle, FaFacebook } from "react-icons/fa";



const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      Name: formData.get("name"),
      Email: formData.get("email"),
      Phone: formData.get("phone"),
      Service: formData.get("service"),
      Message: formData.get("message"),
    };

    const emailBody = `Name - ${data.Name}\nEmail - ${data.Email}\nPhone - ${data.Phone}\nService - ${data.Service}\nMessage - ${data.Message}`;
    
    window.location.href = `mailto:helloweenhell666@gmail.com?subject=New Enquiry&body=${encodeURIComponent(emailBody)}`;
    setIsSubmitted(true);
  };

  return (
    <div className="contact-block">
      {/* Video Carousel Section */}
      <Carousel className="h-100 carousel-section">
        <Carousel.Item className="carousel-item">
          <video className="d-block w-100" autoPlay loop muted>
            <source src={glassPartitions} type="video/mp4" />
          </video>
          <Carousel.Caption>
                <h3>Glass Partitions with a Modern Touch</h3>
                <p>Elegant glass solutions for offices and homes.</p>
              </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <video className="d-block w-100" autoPlay loop muted>
            <source src={wallPanels} type="video/mp4" />
          </video>
          <Carousel.Caption>
            <h3>Stylish Wall Panels for Elegant Spaces</h3>
            <p>Enhance your interiors with modern and textured wall panels.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <video className="d-block w-100" autoPlay loop muted>
            <source src={officeInteriors} type="video/mp4" />
          </video>
          <Carousel.Caption>
            <h3>Premium Office Interiors for Productivity</h3>
            <p>Transform your workspace with sleek and functional designs.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      
      
      {/* Contact Section */}
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Enjoy amazing value-for-money. Best in quality. Book A Free Consultation</p>
        <div className="contact-details">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div>
              <strong>B 38, Ground Floor, Jawahar Park, New Delhi-110062, Delhi, India</strong>
            </div>
          </div>
          <div className="contact-item">
            <FaClock className="contact-icon" />
            <div>
              <strong>All Weekdays ...... 9AM to 7PM</strong>
            </div>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <div>
              <strong>+919899381489 | +919540181489</strong>
              <p>Call now to get a special discount</p>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div>
              <strong>kartikinterior@gmail.com</strong>
            </div>
          </div>
        </div>
        <h3>Follow Us</h3>
        <div className="social-icons">
          <FaGoogle className="social-icon" />
          <FaFacebook className="social-icon" />
        </div>
      </div>
      
      {/* Enquiry Form */}
      <div className="enquiry-section" style={{ background: isSubmitted ? "black" : "#fff", padding: "20px", transition: "0.5s" }}>
        {!isSubmitted && (
          <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
            <h3>Make an Enquiry</h3>
            <input type="text" name="name" placeholder="Name*" required style={{ display: "block", width: "100%", marginBottom: "10px" }} />
            <input type="email" name="email" placeholder="Email*" required style={{ display: "block", width: "100%", marginBottom: "10px" }} />
            <input type="tel" name="phone" placeholder="Phone*" required style={{ display: "block", width: "100%", marginBottom: "10px" }} />
            <select name="service" required style={{ display: "block", width: "100%", marginBottom: "10px" }}>
              <option value="" disabled>Select Required Service*</option>
              <option value="Window Blinds">Window Blinds</option>
              <option value="Zebra Blinds">Zebra Blinds</option>
              <option value="Roller Blinds">Roller Blinds</option>
              <option value="Windows & Frames">Windows & Frames</option>
              <option value="Wooden Blinds">Wooden Blinds</option>
              <option value="Venetian Blinds">Venetian Blinds</option>
              <option value="Printed Roller Blinds">Printed Roller Blinds</option>
              <option value="Vertical Blinds">Vertical Blinds</option>
              <option value="Curtain Blinds">Curtain Blinds</option>
              <option value="Mosquito Blinds">Mosquito Blinds</option>
              <option value="Curtain Rods">Curtain Rods</option>
              <option value="Wallpaper Customized">Wallpaper Customized</option>
              <option value="Wooden Flooring Wallpaper">Wooden Flooring Wallpaper</option>
              <option value="WPC Louvers">WPC Louvers</option>
              <option value="PVC Wall Panel">PVC Wall Panel</option>
              <option value="Artificial Grass">Artificial Grass</option>
            </select>
            <textarea name="message" placeholder="Additional Message*" required style={{ display: "block", width: "100%", marginBottom: "10px" }}></textarea>
            <button type="submit" style={{ display: "block", width: "100%", background: "orange", padding: "10px", border: "none", cursor: "pointer" }}>Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
