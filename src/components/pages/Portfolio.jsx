import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Portfolio.css"; // Add necessary styles here

const Portfolio = () => {
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowProjectDetails((prev) => !prev);
    }, 6000); // Toggle every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="portfolio-container">
      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/slide1.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3>Elegant Window Blinds</h3>
            <p>Choose the perfect blinds to match your home's aesthetics.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/slide2.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h3>Modern Interior Design</h3>
            <p>Enhance your living space with premium designs.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/slide3.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Custom Solutions</h3>
            <p>Tailor-made interiors designed to fit your lifestyle.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="text-content">
          <h2>Our Work</h2>
          <h3>Discover Unique Window Blinds and Home Designs</h3>
          <p>
            Get customized home interior solutions that reflect your style. Consult with us today and elevate your space.
          </p>
        </div>
        <div className="image-content">
          <img src="/images/work-sample.jpg" alt="Work Sample" />
        </div>
      </div>

      {/* Details of Projects Section */}
      <div className="details-section">
        <h2>Details of Projects</h2>
        <div className="project-images">
          <img src="/images/project1.jpg" alt="Project 1" />
          <img src="/images/project2.jpg" alt="Project 2" />
          <img src="/images/project3.jpg" alt="Project 3" />
        </div>
        {showProjectDetails && (
          <div className="project-details animated">
            <p><strong>M/s S Mart Unit of Khemani Brother’s</strong> - Showroom No. 6, Udayraj CHS. Ltd., Agra Road, Kalyan West (1500 Sq.ft showroom).</p>
            <p><strong>M/s. India Bulls Realty Developers Ltd</strong> - Elphistone Road, Mumbai (1200 Sq.ft Washroom).</p>
            <p><strong>M/s. Bhart Electronics Ltd.</strong> - MIDC INDL Area, Taloja, Navi Mumbai.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
