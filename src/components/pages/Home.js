import { React, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import home_top_right from "./../../assets/home-top-right.png";
import home_about_right from "./../../assets/home-about.png";
import notification from "./../../assets/notification.png";
import signup from "./../../assets/signup.png";
import list_items from "./../../assets/list_items.png";
import "./Home.css";
import { TypeAnimation } from "react-type-animation";
import { Link, } from "react-router-dom";
import { motion } from "framer-motion"
// Dynamically import all images from the assets folder
const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
};

// Import all images from the assets folder
const images = importAll(require.context("./../../assets", false, /\.(png|jpe?g|svg)$/));

const serviceVideos = {
  windowBlinds: "/assets/videos/window-blinds.mp4",
  modularKitchen: "/assets/videos/modular-kitchen.mp4",
  modularFalseCeiling: "/assets/videos/modular-false-ceiling.mp4",
  wallPanels: "/assets/videos/wall-panels.mp4",
  wardrobes: "/assets/videos/wardrobes.mp4",
  glassPartitions: "/assets/videos/glass-partitions.mp4",
  flooring: "/assets/videos/flooring.mp4",
  wallpapers: "/assets/videos/wallpapers.mp4",
  mosquitoNet: "/assets/videos/mosquito-net.mp4",
  bathroomInteriors: "/assets/videos/bathroom-interiors.mp4",
  officeInteriors: "/assets/videos/office-interiors.mp4",
  bedroomInteriors: "/assets/videos/bedroom-interiors.mp4",
  livingRoom: "/assets/videos/living-room.mp4",
  outdoorShades: "/assets/videos/outdoor-shades.mp4",
};

const services = Object.keys(serviceVideos).map((key) => ({
  title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
  video: serviceVideos[key],
}));


const Home = () => {

  // Check if the user is logged in (based on the presence of authToken)
  const isLoggedIn = !!localStorage.getItem('Authorization');

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5}
    },
    exit: {
      y: '100vh',
      transition: { ease: 'easeInOut'}
    }
  }

  // Our Services stuff
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (video) => setSelectedVideo(video);
  const closeVideo = () => setSelectedVideo(null);

  return (
    <motion.div 
      className="home-block"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container fluid>
        <Row className="top-box">
          <Col className="mx-2 top-left-text">
          <TypeAnimation
            sequence={[
            "Welcome to Kartik Interiors ✨",
            1000,
            "Where Design Meets Elegance 🏡",
            1000,
            "Crafting Spaces, Creating Experiences 🎨",
            1000,
            "Luxury Interiors, Tailored for You ✨",
            1000,
            "Turn Your Dream Home Into Reality 💫",
            1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
          />

<p>  
  ✨ Elevate your living space with <strong>Kartik Interiors</strong>! 🏡  
  Where <strong>elegance</strong> meets <strong>comfort</strong>, and every detail speaks <strong>luxury</strong>. 💫  
  Let's design your dream home today! 🎨✨  
</p>

          </Col>
          <Col>
            <img
              src={home_top_right}
              alt="home_top_right_img"
              className="home-top-img"
            />
          </Col>
        </Row>
        <Row>
          {/* About Us Section */}
<hr className="section-divider" />
<Row className="about-us-section">
  <Col md={6} className="about-text">
    <h2>About Us</h2>
    <p className="about-tagline">Our passion is to provide clients a superior quality Window Blinds. 🏡✨</p>
    <p>
      At <strong>Kartik Interiors</strong>, we specialize in crafting elegant and functional spaces that reflect your 
      personality. Our expert designers work closely with clients to bring their dream homes to life with premium 
      quality and modern aesthetics. Whether you seek contemporary charm or timeless elegance, we are here to 
      transform your vision into reality. Let’s create something amazing together! 🎨💫
    </p>
  </Col>
  <Col md={6} className="about-image">
    <img src={home_about_right} alt="About Us" className="about-img" />
  </Col>
</Row>
{/* About section end */}
<hr className="section-divider" />

{/* Our Services section start */}
          <Col>
            <h2 className="Our-services-heading">Our Services</h2>
          </Col>
        <Row className="card-section">
        {services.map((service, index) => {
            const imageName = `${service.title.toLowerCase().replace(/ /g, "-")}.jpg`;
            const imageSrc = images[imageName] || images["default.jpg"];
            return (
              <Col key={index} md={4} className="card-box">
                <Card className="card" onClick={() => openVideo(service.video)}>
                  <Card.Img className="card-img-container" variant="top" src={imageSrc} alt={service.title} />
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Button variant="primary">View Sample</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
{selectedVideo && (
        <div className="video-overlay">
          <div className="video-container">
            <video controls autoPlay>
              <source src={selectedVideo} type="video/mp4" />
            </video>
            <div className="video-controls">
              <Button onClick={() => document.querySelector("video").requestFullscreen()}>Fullscreen</Button>
              <Button onClick={() => navigator.clipboard.writeText(selectedVideo)}>Share</Button>
              <Button onClick={closeVideo} variant="danger">✖</Button>
            </div>
          </div>
        </div>
      )}
          
        </Row>
        {/* Our Services Section  */}

        {/* What Our customers say section start*/}
        
      </Container>
    </motion.div>
  );
};

export default Home;
