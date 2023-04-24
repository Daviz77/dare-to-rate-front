import React, { useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getFilmByTitle, getFilmReviews } from '../../services/FilmService'
import ReviewList from '../../components/reviewsList/ReviewsList'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Star from '../../assets/Logo/star.svg'
import AuthContext from '../../contexts/AuthContext'
import ModalReview from '../../components/modalReviews/ModalReview'

function Film() {
	const [film, setFilm] = useState({})
	const [reviews, setReviews] = useState([])
	const [searchParams] = useSearchParams()
	const [showFullDetails, setShowFullDetails] = useState(false)
	const { currentUser } = useContext(AuthContext)
	const [showModalReview, setShowModalReview] = useState(false)

	const StarIcon = () => {
		return <img src={Star} alt='star' className='star-img' />
	}

	const toggleDetails = () => {
		setShowFullDetails(!showFullDetails)
	}

	const deleteUserReview = (reviewId) => {
		setReviews(reviews.filter((r) => r._id !== reviewId))
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

	const addReview = (review) => {
		setReviews([...reviews, review])
	}

	const handleShowModalReview = () => setShowModalReview(true)
	const handleCloseModalReview = () => setShowModalReview(false)

	return (
		<Container>
			<Row className='view-info'>
				<Col style={{marginTop: '80px'}}md={4}>
					<img src={film.poster} alt={film.title} style={{marginBottom: '1rem'}}/>
					{currentUser && (
						<>
							<Button style={{marginLeft: '3rem'}}onClick={handleShowModalReview}>Add Review</Button>
							<ModalReview
								show={showModalReview}
								filmId={film._id}
								imdbId={film.imdbId}
								closeModal={handleCloseModalReview}
								addReview={addReview}
							/>
						</>
					)}
				</Col>
				<Col md={8} style={{marginTop: '80px'}}>
					<h1>{film.title}</h1>
					<h4>
						<b>{film.director}</b>
					</h4>
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
					<span className='link-color link' onClick={toggleDetails}>
						{showFullDetails ? 'Show less' : 'Give more details'}
					</span>
				</Col>
			</Row>
			{film._id && reviews.length > 0 && (
				<Row style={{ marginTop: '5rem' }}>
					<h4 style={{margin: '0'}}>Reviews</h4>
					<ReviewList key={film._id} reviews={reviews} deleteUserReview={deleteUserReview} />
				</Row>
			)}
		</Container>
	)
}

export default Film
