import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-4">
      <Row>
        {/* Center-Right Image */}
        <Col md={7} className="text-center">
          <img
            src="https://via.placeholder.com/400x600" // Replace with your image URL
            alt="Lost and Found"
            className="img-fluid"
          />
        </Col>

        {/* Welcome Description */}
        <Col md={5}>
          <h2>Welcome to Lost & Found App</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
            quam justo.
          </p>

          {/* How It Works Cards */}
          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Report Lost Item</Card.Title>
                  <Card.Text>
                    Easily report your lost items with our simple form.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Search Found Items</Card.Title>
                  <Card.Text>
                    Explore the found items and reclaim what's yours.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Connect with Others</Card.Title>
                  <Card.Text>
                    Connect with people who found or lost similar items.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
