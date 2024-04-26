import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SecurityQuestionModal.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SecurityQuestionModal = (props) => {
  
  const [ answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the answer is present
    if (!answer) {
      // Show an alert if the answer is empty
      toast.info("Please fill in all required fields.")
      return;
    }

    // Call the parent component's onSubmit function
    props.onSubmit(answer);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} >
      <Modal.Header className='security-answer-modal'>
        <Modal.Title>Answer Security Question</Modal.Title>
        <Button variant="link" className="security-question-close-button" onClick={props.handleClose}>
          X
        </Button>
      </Modal.Header>
      <Modal.Body className='security-answer-modal'>
        <Form onSubmit={handleSubmit} className='main-box'>
          <Form.Group controlId="formSecurityQuestion" className='answer-question-box'>
            <Form.Label>{props.securityQuestion}</Form.Label>
            <Form.Control type="text" className='answer-modal-input' placeholder="Enter your answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className='security-question-submit-button'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SecurityQuestionModal
