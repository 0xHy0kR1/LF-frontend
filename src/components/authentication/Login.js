import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import React, {useState} from 'react';
import './Login.css'; 
import top from "./../../assets/cred-top.png";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const formData = {
      email: email,
      password: password,
    };

    // Make a POST request to the backend
    try{
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if(response.ok){
        // Show success alert
        props.showAlert('success', 'Login successful');
      }
      else{
        // Show error alert
        props.showAlert('danger', 'Login failed');
      }
    } catch(error){
      console.error('Error: ' + error);
      // Show error alert 
      props.showAlert('danger', 'Login failed');
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