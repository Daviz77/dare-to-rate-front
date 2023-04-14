import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Landing.css';

const Landing = () => {
  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Welcome to our movie review site!</h1>
          <p className="lead">Share your reviews with other movie lovers</p>
          <Button variant="primary" as={Link} to="/signup">Signup</Button>
          <Button variant="primary" as={Link} to="/login">Login</Button>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <h2>Explore our reviews</h2>
          <p>Dive into our reviews to find the next movie you want to see!</p>
        </Col>
        <Col>
          <h2>Create you own reviews and share them with other users</h2>
          <p>Register and dare to rate!.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
