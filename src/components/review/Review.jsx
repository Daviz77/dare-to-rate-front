import React, { useContext, useEffect, useState } from 'react'
import { getFilmById } from '../../services/FilmService'
import CommentList from '../commentList/CommentList'
import AuthContext from '../../contexts/AuthContext'
import { likeReview } from '../../services/ReviewService'

function Review(props) {
	const { review, isUserView } = props
	const { currentUser } = useContext(AuthContext)
	const [film, setFilm] = useState({})
	const [likes, setLikes] = useState(review.likes)
	const [showComments, setShowComments] = useState(false)
	const { _id, title, author, content, rating } = review

	useEffect(() => {
		if (isUserView && review.film) {
			getFilmById(review.film)
				.then((f) => {
					setFilm(f)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [review.filmId, isUserView])

	const handleLike = (reviewId) => {
		likeReview(reviewId)
			.then((review) => {
				setLikes(review.likes)
			}).catch((error) => {	
				console.log(error)
			})
	}

	return (
		<div className='review'>
			{isUserView ? (
				<div>
					<p>Film title: {film.title}</p>
					<img src={film.poster} alt={film.title} />
				</div>
			) : (
				<div>
					<h3>{title}</h3>
					<p>By {author}</p>

				</div>
			)}
			<p>{content}</p>
			<p> Rating: {rating}</p>
			{likes.length} likes

			{currentUser && (
				<button onClick={() => handleLike(review._id)}>Like</button>
			)}
			{review.comments && review.comments.length > 0 && (
				<>
					<button onClick={() => setShowComments(!showComments)}>Show Comments</button>
					{showComments && <CommentList key={_id} comments={review.comments} />}
				</>
			)}
		</div>
	)
}

export default Review
