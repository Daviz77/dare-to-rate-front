import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { getAuthReviews } from "../../services/ReviewService"

const Home = ({ currentUser }) => {
	const [reviews, setReviews] = useState([])
  
  useEffect(() => {
    getAuthReviews()
      .then((reviews) => {
        setReviews(reviews);
      })
  }, [currentUser]);

	return (
		<Container>
			<Row className='my-5'>
				<Col>
					<h1>Latest following user reviews</h1>
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
	)
}

export default Home
