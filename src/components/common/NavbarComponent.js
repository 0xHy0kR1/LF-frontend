import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarComponent.css';
import DarkMode from './DarkMode/DarkMode';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function NavbarComponent() {

  const navigate = useNavigate();

  // Check if the user is logged in (based on the presence of authToken)
  const isLoggedIn = !!localStorage.getItem('authToken');

  // Handle logout
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('authToken');

    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container fluid >
      <Nav className="me-auto">
      <Link to="/" className='nav-link'>Home</Link>
      {isLoggedIn ? (
            <>
              <Link to="/lost" className='nav-link'>Lost Items</Link>
              <Link to="/found" className='nav-link'>Found Items</Link>
            </>
          ) : (
            <>
              <Link to="/Signup" className='nav-link'>sign-up</Link>
              <Link to="/Login" className='nav-link'>Login</Link>
            </>
      )}
      </Nav>
      {isLoggedIn && (
        <Button variant='danger' className='logout-button' onClick={handleLogout}>Logout</Button>
      )}
      <DarkMode/>
    </Container>
  </Navbar>
  );
}

export default NavbarComponent;
