import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarComponent.css';
import DarkMode from './DarkMode/DarkMode';

function NavbarComponent() {


  return (
    <Navbar expand="lg" className={`navbar-dark navbar-custom `}>
      <Container fluid>
        <Nav className='ml-auto nav-collap'>
          <Nav.Link href="#action2" className='nav-link'>sign-up</Nav.Link>
          <Nav.Link href="#action2" className='nav-link'>Login</Nav.Link>
        </Nav>
        <DarkMode/>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
