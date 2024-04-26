import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import React, {useState} from 'react';
import './Login.css'; 
import top from "./../../assets/cred-top.png";
import authService from './../services/authService'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"
function Login() {
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
    console.log("Login result: " + loginResult)

    if(loginResult.success) {
      // Store the token in localStorage
      localStorage.setItem('Authorization', loginResult.token);

      // Show success alert
      toast.success(loginResult.message);

      // Redirect the user to Home page after successful login
      navigate('/');
    }else {
      // Show error alert
      toast.error(loginResult.message);
    }
  }

  const loginBlockVariant = {
    hidden: {
      opacity: 0,
      y: "-100vh",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        delay: 0.5
      }
    },
  }

  return (
    <motion.div className="signup-block" variants={loginBlockVariant} initial="hidden" animate="visible" exit="hidden">
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
            SIGN IN
          </Button>
        </Form>
        <p className="bottom-text">Don't have an account? <span className='signup-text'><a href="/signup">Sign up</a></span></p>
      </Container>
    </motion.div>
  );
}

export default Login;