import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getFilmByTitle, getFilmReviews } from '../../services/FilmService'
import ReviewList from '../../components/reviewsList/ReviewsList'
import { Col, Container, Row } from 'react-bootstrap'
import Star from '../../assets/Logo/star.svg'

function Film() {
	const [film, setFilm] = useState({})
	const [reviews, setReviews] = useState([])
	const [searchParams] = useSearchParams()
	const [showFullDetails, setShowFullDetails] = useState(false)

	const StarIcon = () => {
		return <img src={Star} alt='star' className='star-img' />
	}

	const toggleDetails = () => {
		setShowFullDetails(!showFullDetails)
	}

	const shortPlot = film?.plot?.slice(0, 800) + '...'

	useEffect(() => {
		getFilmByTitle(searchParams.get('title'))
			.then((film) => {
				if (!film) {
					navigate('/film-not-found')
				}
				setFilm(film)

				if (film._id) {
					getFilmReviews(film._id)
						.then((reviews) => setReviews(reviews))
						.catch((error) => console.log(error))
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [searchParams.get('title')])

	return (
		<Container>
			<Row className='view-info'>
				<Col md={4}>
					<img src={film.poster} alt={film.title} />
				</Col>
				<Col md={8}>
					<h1>{film.title}</h1>
					<p>
						<b>{film.director}</b>
					</p>
					<p>
						<StarIcon />{' '}
						<span>
							<b id='rating'>{film.rating}</b>/10
						</span>{' '}
					</p>

					<p>{showFullDetails ? film.plot : shortPlot}</p>
					{showFullDetails && (
						<>
							<p>
								<b>Released:</b> {film.year} <br />
								<b>Genre:</b> {film.genre} <br />
								<b>Runtime:</b> {film.runtime} <br />
								<b>Actors:</b> {film.actors} <br />
							</p>
						</>
					)}
					<span className='link-color' onClick={toggleDetails}>
						{showFullDetails ? 'Show less' : 'Give more details'}
					</span>
				</Col>
			</Row>
			{film._id && (
				<Row style={{ marginTop: '5rem' }}>
					<h2>Reviews</h2>
					<ReviewList key={film._id} reviews={reviews} />
				</Row>
			)}
		</Container>
	)
}

export default Film
