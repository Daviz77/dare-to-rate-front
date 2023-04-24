import React, { useContext, useEffect, useState } from 'react'
import ReviewList from '../../components/reviewsList/ReviewsList'
import { getReviewsByUserId } from '../../services/ReviewService'
import { followUser, getUserById, getUserFollowers } from '../../services/UserService'
import { Navigate, useParams } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './User.css'
import AuthContext from '../../contexts/AuthContext'

function User() {
	const { currentUser } = useContext(AuthContext)
	const [user, setUser] = useState({})
	const [reviews, setReviews] = useState([])
	const { userId } = useParams()
	const [followers, setFollowers] = useState([])
	const [isFollowing, setIsFollowing] = useState(currentUser?.followings.includes(userId))

	useEffect(() => {
		if (currentUser === userId) Navigate('/profile')
		getUserFollowers(userId)
			.then((fs) => setFollowers(fs))
			.catch((error) => console.log(error))

		getUserById(userId)
			.then((u) => {
				setUser(u)

				getReviewsByUserId(u._id)
					.then((reviews) => setReviews(reviews))
					.catch((error) => console.log(error))
			})
			.catch((error) => console.log(error))
	}, [userId])

	const handleFollow = (id) =>
		followUser(id)
			.then(() => {
				setIsFollowing(!isFollowing)
				if (isFollowing) {
					setFollowers(followers.filter((f) => f._id !== currentUser._id))
				} else {
					setFollowers([...followers, currentUser])
				}
			})
			.catch((error) => console.log(error))

	return (
		<Container>
			<Row className='view-info'>
				<Col md={4}>
					<Row style={{ textAlign: 'center' }}>
						<div style={{marginBottom: '2rem'}}>
							<img src={user.img} className='user-view-img' alt={user.username} />
						</div>
						<p>
							{followers.length} followers <br />
							{user?.followings?.length} following
						</p>
						{currentUser && (
							<div>
								{isFollowing ? (
									<span className='link-color follow-btn' onClick={() => handleFollow(userId)}>
										Unfollow
									</span>
								) : (
									<Button onClick={() => handleFollow(userId)}>Follow</Button>
								)}
							</div>
						)}
					</Row>
				</Col>
				<Col md={8}>
					<h1>{user.username}</h1>
					<h4>About</h4>
					<p>{user.about}</p>
				</Col>
				{reviews.length > 0 && (
					<Row style={{ marginTop: '5rem' }}>
						<h2>Reviews</h2>
						<ReviewList key={user._id} reviews={reviews} isUserView={true} showReviewFilmTitle={true} />
					</Row>
				)}
			</Row>
		</Container>
	)
}

export default User
