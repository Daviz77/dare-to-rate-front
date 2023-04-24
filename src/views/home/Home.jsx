import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { getAuthReviews } from '../../services/ReviewService'
import AuthContext from '../../contexts/AuthContext'
import ReviewList from '../../components/reviewsList/ReviewsList'

const Home = () => {
	const [reviews, setReviews] = useState([])
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		getAuthReviews().then((reviews) => setReviews(reviews))
	}, [currentUser])

	return (
		<Container>
			<div className='header-home' style={{marginTop: '80px'}}>
				<h2 className='p2'>
					Whats <span className='span-new'>new?</span>
				</h2>{' '}
				<h4 style={{ marginTop: '2rem' }}>Reviews from those you follow</h4>
			</div>
			<ReviewList reviews={reviews?.followedReviews} showReviewFilmTitle={true} />

			<h4 style={{ marginTop: '4rem' }}>Reviews from others</h4>
			<ReviewList reviews={reviews?.otherReviews} showReviewFilmTitle={true} />
		</Container>
	)
}

export default Home
