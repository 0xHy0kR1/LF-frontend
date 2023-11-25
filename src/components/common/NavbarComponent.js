import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarComponent.css';
import DarkMode from './DarkMode/DarkMode';
import { Link, useLocation} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import PostItemModal from '../modal/PostItemModal';
import { jwtDecode } from "jwt-decode";

function NavbarComponent(props) {
// State to manage modal visibility 
const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
  // Check if the user is logged in and the token is expired
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    const decodedToken = jwtDecode(authToken);
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decodedToken.exp < currentTime) {
      // Token is expired, log out the user
      handleLogout();
    }
  }
}, []);

// Function to show the modal 
const handleModalShow = () => setShowModal(true);

// Function to hide the modal
const handleModalClose = () => setShowModal(false);

  // Check if the user is logged in (based on the presence of authToken)
  const isLoggedIn = !!localStorage.getItem('authToken');

  const isLostPage = location.pathname === '/lost';
  
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
      <Link to="/lost" className='nav-link'>Lost Items</Link>
      {/* <Link to="/my-listing" className='nav-link'>my-listing</Link> */}
      {isLoggedIn ? ('') : (
            <>
              <Link to="/Signup" className='nav-link'>sign-up</Link>
              <Link to="/Login" className='nav-link'>Login</Link>
            </>
          )}
      </Nav>
      
      {isLostPage && isLoggedIn && (
          <>
            <PostItemModal
              showModal={showModal}
              handleModalShow={handleModalShow}
              handleModalClose={handleModalClose}
              fetchLostItems={props.fetchLostItems}
              showAlert={props.alert}
            />
            <Button
              variant='primary'
              className="post-item-button"
              onClick={handleModalShow}
            >
              Post Item
            </Button>
          </>
        )}
      {isLoggedIn && (
        <Button variant='danger' className='logout-button' onClick={handleLogout}>Logout</Button>
      )}
      <DarkMode/>
    </Container>
  </Navbar>
  );
}

export default NavbarComponent;
