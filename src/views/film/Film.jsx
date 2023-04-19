import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getFilmById, getFilmByTitle, getFilmReviews } from '../../services/FilmService'
import { getCommentByReviewId } from '../../services/CommentService'

function Film() {
	const [film, setFilm] = useState({})
	const [reviews, setReviews] = useState([])
	const [searchParams] = useSearchParams();

	useEffect(() => {
		getFilmByTitle(searchParams.get("title"))
			.then((film) => {
				if (!film) {
					navigate('/film-not-found')
				}

				setFilm(film)
				if (film._id) {
					getFilmReviews(film._id)
						.then((reviews) => {
							setReviews(reviews)
						})
						.catch((error) => {
							console.log(error)
						})
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

/* 	const getCommentsByReview = (reviewId) => {
		getCommentByReviewId(reviewId)
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	} */

	function toggleComments(reviewId) {
    setReviews((prevReviews) =>
        prevReviews.map((review) => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    showComments: !review.showComments,
                };
            }
            return review;
        })
    );
}

	return (
		<div>
			<h1>{film.title}</h1>
			<p>{film.director}</p>
			<p>{film.actors}</p>
			<p>{film.country}</p>
			<p>{film.plot}</p>
			<h2>Reviews</h2>
			<ul>
				{reviews.map((review) => (
					<li key={review._id}>
						<h3>{review.rating}</h3>
						<p>{review.author}</p>
						<h4>{review.title}</h4>
						<p>{review.content}</p>
						{review.likes.length} likes
					<button onClick={() => handleLike(review._id)}>
						Like
					</button>
 					{/* <button onClick={() => toggleComments(review._id)}>Show Comments</button>
						{review.showComments && (
							<ul>
								{review.comments.map((comment) => (
									<li key={comment._id}>
										<p>{comment.content}</p>
									</li>
								))}
							</ul>
						)} */}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Film