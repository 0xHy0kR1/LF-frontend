import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Portfolio.css"; // Add necessary styles here
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide4 from "../../assets/slide4.jpg";
import slide5 from "../../assets/slide5.jpg";
import workSample from "../../assets/work-sample.jpg";
import project1 from "../../assets/project1.jpg";
import project2 from "../../assets/project2.jpg";
import project3 from "../../assets/project3.jpg";


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
      <Carousel className="h-100 carousel-section">
        <Carousel.Item className="carousel-item">
          <img className="d-block w-100 carousel-img" src={slide1} alt="First slide" />
          <Carousel.Caption>
            <h3>Elegant Window Blinds</h3>
            <p>Choose the perfect blinds to match your home's aesthetics.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img className="d-block w-100 carousel-img" src={slide2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Modern Interior Design</h3>
            <p>Enhance your living space with premium designs.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img className="d-block w-100 carousel-img" src={slide3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Custom Solutions</h3>
            <p>Tailor-made interiors designed to fit your lifestyle.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img className="d-block w-100 carousel-img" src={slide4} alt="fouth slide" />
          <Carousel.Caption>
            <h3>Custom Solutions</h3>
            <p>Tailor-made interiors designed to fit your lifestyle.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img className="d-block w-100" src={slide5} alt="fifth slide" />
          <Carousel.Caption>
            <h3>Custom Solutions</h3>
            <p>Tailor-made interiors designed to fit your lifestyle.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <hr className="section-divider" />
      {/* Middle Section */}
      <div className="middle-section">
        <div className="text-content">
          <h2>Our Work</h2>
          <h3>Discover Unique Window Blinds and Home Designs</h3>
          <p>
            Get customized home interior solutions that reflect your style. Consult with us today and elevate your space.
          </p>
        </div>
        <div className="middle-image">
          <img src={workSample} alt="Work Sample"  className="work-sample-image"/>
        </div>
      </div>
      <hr className="section-divider" />
      
      {/* Details of Projects Section */}
      <div className="details-section">
        <h2>Details of Projects</h2>
        <div className="project-images">
          <img src={project1} alt="Project 1" />
          <img src={project2} alt="Project 2" />
          <img src={project3} alt="Project 3" />
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
