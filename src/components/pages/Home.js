import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import home_top_right from "./../../assets/home_top_right.jpg"
import card1 from "./../../assets/card1.jpg";
import card2 from "./../../assets/card2.jpg";
import card3 from "./../../assets/card3.jpg";
import './Home.css';

const Home = () => {
  return (
    <Container fluid>
      <Row className='top-box'>
        <Col>
        <h2>Welcome to Lost & Found App</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
            quam justo.
          </p>
        </Col>
        <Col>
        <img src={home_top_right} alt="home_top_right_img" className='home-top-img'/>
        </Col>
      </Row>
      <Row>
        <Col>
        <Card>
          <Card.Img variant="top" src={card1} />
          <Card.Body>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Img variant="top" src={card2} />
          <Card.Body>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Img variant="top" src={card3} />
          <Card.Body>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;