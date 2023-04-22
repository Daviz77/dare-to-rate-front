import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getFilmByTitle, getFilmReviews } from '../../services/FilmService'
import ReviewList from '../../components/reviewsList/ReviewsList'
import { Container } from 'react-bootstrap'

function Film() {
	const [film, setFilm] = useState({})
	const [reviews, setReviews] = useState([])
	const [searchParams] = useSearchParams()
	const [showFullPlot, setShowFullPlot] = useState(false)

	const togglePlot = () => {
		setShowFullPlot(!showFullPlot)
	}

	const shortPlot = film?.plot?.slice(0, 200) + '...'

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
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [searchParams.get('title')])

	return (
		<div className='row' style={{ padding: '1rem', margin: '0' }}>
			<div className='col-6 d-flex'>
				<img src={film.poster} alt={film.title} />
			</div>
			<div className='col-6'>
				<h1>Title: {film.title}</h1>
				<p>Year: {film.year}</p>
				<p>Director: {film.director}</p>
				<div>
					<p>Plot: {showFullPlot ? film.plot : shortPlot}</p>
					{showFullPlot ? null : (
						<button className='link-color' style={{border: 'none'}} onClick={togglePlot}>
							Give more details
						</button>
					)}
				</div>
			</div>
			<Container>
				{film._id && (
					<div style={{ marginTop: '5rem'}}>
						<h2>Reviews</h2>
						<ReviewList key={film._id} reviews={reviews} />
					</div>
				)}
			</Container>
		</div>
	)
}

export default Film
