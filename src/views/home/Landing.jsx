import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Landing.css';
import { getReviews } from '../../services/ReviewService';

const Landing = () => {
  const [reviews, setReviews] = useState([])
  
  useEffect(() => {
    const fetchReviews = () => {
      getReviews()
        .then((reviews) => {
          setReviews(reviews);
        })
    };
    fetchReviews();
  }, []);
  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Welcome to our movie review site!</h1>
          <p className="lead">Share your reviews with other movie lovers</p>
         {/*  <Button variant="primary" as={Link} to="/signup">Signup</Button>
          <Button variant="primary" as={Link} to="/login">Login</Button> */}
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
      <Row>
				{reviews.map((reviews) => (
					<Col key={reviews._id} sm={12} md={6} lg={4} className='mb-3'>
						<Card>
							<Card.Body>
								<Card.Title>{reviews.title}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>
									{reviews.author.username}
								</Card.Subtitle>
								<Card.Text>{reviews.content}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
    </Container>
  );
};

export default Landing;
