import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import './Landing.css'
import { getReviews } from '../../services/ReviewService'
import ReviewList from '../../components/reviewsList/ReviewsList'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
	const [reviews, setReviews] = useState([])
  const navigate = useNavigate()
	const navigateTo = (path) => {
		navigate(path)
	}

	useEffect(() => {
		const fetchReviews = () => {
			getReviews().then((reviews) => {
				setReviews(reviews)
			})
		}
		fetchReviews()
	}, [])
	return (
		<>
			<div className='my-5' style={{ padding: '13rem', margin: '0' }}>
				<Col>
					<h1>Watch a film. Rate it. Share it with the world.</h1>
					<p className='lead p1'>
						Don´t wasted your time with bad movies that don´t fit what you like. Let yourself be recommended by people
						who have the same tastes as you. And of course... Dare to rate!
					</p>
					<div className='landing-btns'>
						<div className='landing-btn'>
							<Button className='btn-outline-primary landing-btn-link' onClick={() => navigateTo('/login') }>
								Login
							</Button>
						</div>
						<div className='landing-btn'>
							<Button className='landing-btn-link' onClick={() => navigateTo('/signup')}>
								Signup
							</Button>
						</div>
					</div>
				</Col>
			</div>
			<Container>
				<Row>
					<div className='text-up'>
						<h2 className='p2'>
							Whats <span className='span-new'>new?</span>
						</h2>
					</div>
					<h4 className='text-down'>Latest reviews</h4>

					<ReviewList reviews={reviews} showReviewFilmTitle={true} />
				</Row>
			</Container>
		</>
	)
}

export default Landing
