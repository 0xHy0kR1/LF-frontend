import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import React from 'react';
import './Login.css'; 
import top from "./../../assets/cred-dark.png";

function Login() {
  return (
    <Container className='login-container'>
      <Form className='login-form'>
        <img src={top} alt="cred-dark" className='top-img'/>
        <Form.Group className="mb-4 login-input-block" controlId="formBasicEmail">
          <Form.Control className="login-input" type="email" placeholder="email address" />
        </Form.Group>

        <Form.Group className="mb-4 login-input-block" controlId="formBasicPassword">
          <Form.Control className="login-input" type="password" placeholder="password" />
        </Form.Group>

        <Button variant="success" className="login-submit-button" type="submit">
          Create An Account
        </Button>
      </Form>
    </Container>
  );
}

export default Login;