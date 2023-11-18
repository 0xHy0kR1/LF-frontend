import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import React, {useState} from 'react';
import './Login.css'; 
import top from "./../../assets/cred-top.png";
import authService from './../services/authService'
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const formData = {
      email: email,
      password: password,
    };

    // Logged in the user using authService
    const loginResult = await authService.loginUser(formData);

    if(loginResult.success) {
      // Store the token in localStorage
      localStorage.setItem('authToken', loginResult.token);

      // Show success alert
      props.showAlert('success', loginResult.message);

      // Redirect the user to Home page after successful login
      navigate('/');
    }else {
      // Show error alert
      props.showAlert('danger', loginResult.message);
    }
  }

  return (
    <Container className='login-container'>
      <Form className='login-form' onSubmit={handleSubmit}>
        <img src={top} alt="cred-dark" className='top-img'/>
        <Form.Group className="mb-4 login-input-block" controlId="formBasicEmail">
          <Form.Control className="login-input" type="email" placeholder="email address" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-4 login-input-block" controlId="formBasicPassword">
          <Form.Control className="login-input" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="success" className="login-submit-button" type="submit">
          Create An Account
        </Button>
      </Form>
    </Container>
  );
}

export default Login;