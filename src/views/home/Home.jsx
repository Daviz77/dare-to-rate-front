import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { getAuthReviews } from '../../services/ReviewService'

const Home = ({ currentUser }) => {
	const [reviews, setReviews] = useState()

	useEffect(() => {
		getAuthReviews().then((reviews) => {
			console.log(reviews)
			setReviews(reviews)
		})
	}, [currentUser])

	return (
		<Container>
			<Row className='my-5'>
				<Col>
					<h1>Latest following user reviews</h1>
				</Col>
			</Row>
			<Row>
				{reviews?.followedReviews?.map((followedReview) => (
					<Col key={followedReview._id} sm={12} md={6} lg={4} className='mb-3'>
						<Card>
							<Card.Body>
								<Card.Title>{followedReview.title}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>{followedReview.author.username}</Card.Subtitle>
								<Card.Text>{followedReview.content}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<Row>
				{reviews?.otherReviews?.map((otherReview) => (
					<Col key={otherReview._id} sm={12} md={6} lg={4} className='mb-3'>
						<Card>
							<Card.Body>
								<Card.Title>{otherReview.title}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>{otherReview.author.username}</Card.Subtitle>
								<Card.Text>{otherReview.content}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default Home
