import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SecurityQuestionModal = (props) => {
  
  const [ answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(answer);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Answer Security Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSecurityQuestion">
            <Form.Label>{props.securityQuestion}</Form.Label>
            <Form.Control type="text" placeholder="Enter your answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SecurityQuestionModal
