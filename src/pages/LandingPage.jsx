import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#">YOUR LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Services</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
              <Nav.Link href="#">FAQ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="hero-section cont1">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Building a Brighter <br /> <strong>Financial Future</strong></h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
         
          <Button variant="light" className="sign-in-button" > <NavLink to="/signup">Sign Up</NavLink></Button>
        </motion.div>

        <motion.div
          className="hero-image cont2"
          
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/assets/finance-illustration.jpg" alt="Financial Analysis" />
        </motion.div>
      </Container>
    </div>
  );
};

export default LandingPage;

/* LandingPage.css */
