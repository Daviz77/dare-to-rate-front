import React, { useEffect, useState } from 'react'
import ReviewList from '../../components/reviewsList/ReviewsList'
import { getReviewsByUserId } from '../../services/ReviewService'
import { getUserById } from '../../services/UserService'
import { useParams } from 'react-router-dom'

function User() {
	const [user, setUser] = useState({})
	const [reviews, setReviews] = useState([])
  const { userId } = useParams()


	useEffect(() => {
		getUserById(userId)
			.then((user) => {
				setUser(user)

				getReviewsByUserId(user._id)
					.then((reviews) => {
						reviews.map((r) => {
							r.authorName = r.author.username
							r.authorImg = r.author.img
							r.authorId = r.author._id
							r.author = null
						})
						setReviews(reviews)
					})
					.catch((error) => {
						console.log(error)
					})
			})
			.catch((error) => {
				console.log(error)
			})
	}, [userId])

	return (
		<div>
			<h1>User {user.username}</h1>
				<div>
					<h2>Reviews</h2>
					<ReviewList key={user._id} reviews={reviews} isUserView={true} />
				</div>

		</div>
	)
}

export default User
