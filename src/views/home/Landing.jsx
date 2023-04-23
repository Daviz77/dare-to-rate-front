import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import './Landing.css'
import { getReviews } from '../../services/ReviewService'
import ReviewList from '../../components/reviewsList/ReviewsList'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo.svg'

const LogoDr = () => {
	return (
		<img src={Logo} alt='logo' className='logo-img'/>
	)
}

const Landing = () => {
	const [reviews, setReviews] = useState([])

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
      <div className='my-5' style={{padding: '14rem', margin: '0'}}>
      <LogoDr />
        <Col>
          <h1>Watch a film. Rate it. Share it with the world.</h1>
          <p className='lead'>
            Don´t wasted your time with bad movies that don´t fit what you like. Let yourself be recommended by people
            who have the same tastes as you. And of course... Dare to rate!
          </p>
          <div className='landing-btns'>
            <div className='landing-btn-i'>
              <Button variant='primary' as={Link} to='/login'>
                Login
              </Button>
            </div>
            <div className='landing-btn-d'>
              <Button variant='primary' as={Link} to='/signup'>
                Signup
              </Button>
            </div>
          </div>
        </Col>
      </div>
      <Container>
        <Row>
          <div className='text-up'>
            <h2>Whats new?</h2>
          </div>
          <div className='text-down'>
            <p>Latest reviews</p>
          </div>
          <ReviewList reviews={reviews} />
        </Row>
      </Container>
    </>
	)
}

export default Landing
