import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { getAuthReviews } from '../../services/ReviewService'
import AuthContext from '../../contexts/AuthContext'
import ReviewList from '../../components/reviewsList/ReviewsList'

const Home = () => {
	const [reviews, setReviews] = useState([])
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		getAuthReviews().then((reviews) => {
			setReviews(reviews)
		})
	}, [currentUser])

	return (
		<Container>
			<Row className='my-5'>
				<Col>
					<h1>Latest followings users reviews</h1>
				</Col>
			</Row>
			<ReviewList reviews={reviews?.followedReviews} />

			<Row className='my-5'>
				<Col>
					<h1>Latest other users reviews</h1>
				</Col>
			</Row>
			<ReviewList reviews={reviews?.otherReviews} />
		</Container>
	)
}

export default Home
