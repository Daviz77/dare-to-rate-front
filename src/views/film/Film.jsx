import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getFilmByTitle, getFilmReviews } from '../../services/FilmService'
import ReviewList from '../../components/reviewsList/ReviewsList'

function Film() {
	const [film, setFilm] = useState({})
	const [reviews, setReviews] = useState([])
	const [searchParams] = useSearchParams()

	useEffect(() => {
		getFilmByTitle(searchParams.get('title'))
			.then((film) => {
				if (!film) {
					navigate('/film-not-found')
				}
				setFilm(film)
				
				if (film._id) {
					getFilmReviews(film._id)
						.then((reviews) => {
							reviews.map(r => {
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
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [searchParams.get('title')])

	return (
		<div>
			<h1>Title: {film.title}</h1>
			<img src={film.poster} alt={film.title} />
			<p>Director: {film.director}</p>
			<p>Actors: {film.actors}</p>
			<p>Country: {film.country}</p>
			<p>Plot: {film.plot}</p>
			{film._id && (
				<div>
					<h2>Reviews</h2>
					<ReviewList key={film._id} reviews={reviews} />
				</div>
			)}
		</div>
	)
}

export default Film
