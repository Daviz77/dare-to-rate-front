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
			<h2>Whats new?</h2>
			<h3>Reviews from those you follow</h3>
			<ReviewList reviews={reviews?.followedReviews} />

			<h3 style={{marginTop: '2rem'}}>Reviews from others</h3>
			<ReviewList reviews={reviews?.otherReviews} />
		</Container>
	)
}

export default Home
