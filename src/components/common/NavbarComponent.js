import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarComponent.css';
import DarkMode from './DarkMode/DarkMode';
import { Link } from 'react-router-dom';

function NavbarComponent() {


  return (
    <Navbar expand="lg" className={`navbar-dark navbar-custom `}>
      <Container fluid>
        <Nav className='ml-auto nav-collap'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/Signup" className='nav-link'>sign-up</Link>
          <Link to="/Login" className='nav-link'>Login</Link>
        </Nav>
        <DarkMode/>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
