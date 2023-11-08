import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function FoundItemForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the form values and assign "formData" object with the values of the title, description, category, and location state variables and set isLost as false
    const formData = {
      title,
      description,
      category,
      location,
      isLost: false, // Indicate that it's a found item
    }

    // Send form data to the backend API for item creation
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if(response.ok){

        // Handle success item creation(e.g., show a success message)
        alert('Item created successfully');
      }
      else{

        // Handle error or display an error message
        alert('Item creation failed. Please try again');
      }
    } catch (error) {
      console.error('Error', error);
      alert('An error occurred. Please try again')
   }
  };

  return (
    <Container>
      <h2>Submit a Found Item</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default FoundItemForm;
