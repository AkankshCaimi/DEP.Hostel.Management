import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Logo from '../logo.png'; // Replace 'your-logo-path' with the actual path to your logo

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          {/* Logo added to the top left corner */}
          <img src={Logo} alt="Logo" className="mr-2" width="60" height="70" />
          <NavLink to="/" className="navbar-brand">
            Hostel
          </NavLink>

          <Nav className="ml-auto">
            <NavLink to="/signup" className="nav-link text-light text-decoration-none mt-3 mx-2">
              Register
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
