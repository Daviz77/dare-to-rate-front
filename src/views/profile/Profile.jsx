import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import './Profile.css'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { logout } from '../../stores/AccessTokenStore'
import { getUserFollowers } from '../../services/UserService'
import { getReviewsByUserId } from '../../services/ReviewService'
import ReviewList from '../../components/reviewsList/ReviewsList'

const Profile = () => {
	const { currentUser, getCurrentUser } = useContext(AuthContext)
	const [followers, setFollowers] = useState([])
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		getUserFollowers(currentUser._id)
			.then((data) => setFollowers(data))
			.catch((error) => console.error(error))
	}, [currentUser])

	useEffect(() => {
		getReviewsByUserId(currentUser._id)
			.then((data) => setReviews(data))
			.catch((error) => console.error(error))
	}, [currentUser])

	return (
		<Container>
			<Row className='user-info'>
				<Col md={4}>
					<img className='profile-img' src={currentUser.img} alt={currentUser.img} />
				</Col>
				<Col className='profile-user' md={8}>
					<h1>{currentUser.username}</h1>
					<p>{currentUser.about}</p>
					<div>
						<p>
							<span className='profile-stat-label'>Followers: </span>
							<span className='profile-stat-number'>{followers.length}</span>
							<br />
							<span className='profile-stat-label'>Following: </span>
							<span className='profile-stat-number'>{currentUser.followings.length}</span>
						</p>
					</div>
					<div className='profile-buttons'>
						<Link to='/update-profile'>
							<Button className='btn-update' variant='primary'>
								Update Profile
							</Button>
						</Link>
						<Button className='btn-review-card link' onClick={logout} id='btn-delete-review'>
							Logout
						</Button>
					</div>
				</Col>
			</Row>
			<Row className='reviews-profile'>
				<h3>Your Reviews</h3>
			</Row>
			{reviews.length > 0 && <ReviewList key={currentUser._id} reviews={reviews} isUserView={true} />}
		</Container>
	)
}

export default Profile
