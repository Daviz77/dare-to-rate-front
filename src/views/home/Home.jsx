import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { getAuthReviews } from '../../services/ReviewService'
import AuthContext from '../../contexts/AuthContext'

const Home = () => {
	const [reviews, setReviews] = useState()
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		getAuthReviews().then((reviews) => {
			setReviews(reviews)
		})
	}, [currentUser])

	return (
		<Container>
			<div>
				<Row className='my-5'>
					<Col>
						<h1>Latest followings users reviews</h1>
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
			</div>
			<div>
				<Row className='my-5'>
					<Col>
						<h1>Latest other users reviews</h1>
					</Col>
				</Row>
				<Row>
					{reviews?.otherReviews?.map((otherReview) => 
						currentUser && currentUser._id !== otherReview.author._id &&
						<Col key={otherReview._id} sm={12} md={6} lg={4} className='mb-3'>
							<Card>
								<Card.Body>
									<Card.Title>{otherReview.title}</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>{otherReview.author.username}</Card.Subtitle>
									<Card.Text>{otherReview.content}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					)}
				</Row>
			</div>
		</Container>
	)
}

export default Home
