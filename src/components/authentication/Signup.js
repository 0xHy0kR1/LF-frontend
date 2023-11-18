import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import React from 'react';
import './Signup.css'; 
import top from "./../../assets/cred-top.png";
import authService from './../services/authService';

function Signup(props) {
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // sign up the user using authService
    const signupResult = await authService.registerUser(formData);

    // Show the alert based on the signup result
    if(signupResult.success) {
      props.showAlert('success', signupResult.message);
    } else{
      props.showAlert('danger', signupResult.message);
    }
}
  return (
    <Container className='signup-container'>
      <Form className='signup-form' onSubmit={handleSubmit}>
      <img src={top} alt="cred-dark" className='top-img'/>
        <Form.Group className="mb-4 signup-input-block" controlId="formBasicEmail">
          <Form.Control className="signup-input" name="username" type="text" placeholder="username" />
        </Form.Group>

        <Form.Group className="mb-4 signup-input-block" controlId="formBasicEmail">
          <Form.Control className="signup-input" type="email" placeholder="email address" name="email"/>
        </Form.Group>

        <Form.Group className="mb-4 signup-input-block" controlId="formBasicPassword">
          <Form.Control className="signup-input" type="password" placeholder="password" name="password"/>
        </Form.Group>

        <Button variant="success" className="signup-submit-button" type="submit">
          Create An Account
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;