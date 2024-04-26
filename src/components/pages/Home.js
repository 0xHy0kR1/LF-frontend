import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import home_top_right from "./../../assets/home_top_right.png";
import notification from "./../../assets/notification.png";
import signup from "./../../assets/signup.png";
import list_items from "./../../assets/list_items.png";
import "./Home.css";
import { TypeAnimation } from "react-type-animation";
import { Link, } from "react-router-dom";
import { motion } from "framer-motion"

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
          <Col className="mx-2">
            <TypeAnimation
              sequence={[
                "Welcome to ReclaimHub",
                1000,
                "Create An Account",
                1000,
                "List Your Lost Items",
                1000,
                "Get Notified",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "2em", display: "inline-block"  }}
              repeat={Infinity}
            />
            <p>
              Find what's lost, and reunite with what matters most - where lost
              items discover their way back home
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
          <Col>
            <h2 className="how-work-head">HOW IT WORKS?</h2>
          </Col>
        </Row>
        <Row className="card-section">
          <Col className="card-box">
            <Card className="card">
              <Card.Img
                variant="top"
                src={signup}
                className="card-img-container"
              />
              <Card.Body>
                <Card.Title>Create an account</Card.Title>
                <Card.Text>
                  Report your lost item and for that create an account
                </Card.Text>
                {isLoggedIn ? '': 
                  <Link to="/Signup">
                    <Button className="card1-bottom-button" variant="success">Sign up</Button>
                  </Link>
                }
              </Card.Body>
            </Card>
          </Col>
          <Col className="card-box">
            <Card className="card">
              <Card.Img
                variant="top"
                src={list_items}
                className="card-img-container"
              />
              <Card.Body>
                <Card.Title>List Lost/Found Item</Card.Title>
                <Card.Text>
                  Our smart system finds potential matches for your lost item.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="card-box">
            <Card className="card">
              <Card.Img
                variant="top"
                src={notification}
                className="card-img-container"
              />
              <Card.Body>
                <Card.Title>Get Notified</Card.Title>
                <Card.Text>
                  Stay connected and get notified about potential matches.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Home;
