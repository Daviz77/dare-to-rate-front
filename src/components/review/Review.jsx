import React, { useContext, useEffect, useState } from 'react'
import CommentList from '../commentList/CommentList'
import AuthContext from '../../contexts/AuthContext'
import { createReview, likeReview, deleteReview } from '../../services/ReviewService'
import { Link } from 'react-router-dom'
import { followUser } from '../../services/UserService'
import { Button, Card, CardImg, Col, Row } from 'react-bootstrap'
import { getCommentByReviewId } from '../../services/CommentService'
import './Review.css'
import Star from '../../assets/Logo/star.svg'
import ModalComment from '../modalComments/ModalComment'

function Review(props) {
	const { review, isUserView, showReviewFilmTitle, deleteUserReview } = props
	const { currentUser } = useContext(AuthContext)
	const [likes, setLikes] = useState(review.likes)
	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState(review.comments)
	const [isFollowing, setIsFollowing] = useState(currentUser?.followings.includes(review.author?._id))
	const { _id, title, author, film, content, rating } = review
	const [showModalComment, setShowModalComment] = useState(false)

	const handleShowModalComment = () => setShowModalComment(true)
	const handleCloseModalComment = () => setShowModalComment(false)

	const StarIcon = () => {
		return <img src={Star} alt='star' className='star-img' />
	}

	const handleLike = (reviewId) => {
		likeReview(reviewId)
			.then((r) => setLikes(r.likes))
			.catch((error) => console.log(error))
	}

	const handleDelete = (reviewId) => {
		deleteReview(reviewId)
			.then(() => deleteUserReview(reviewId))
			.catch((error) => console.log(error))
	}

	const updateComments = (reviewId) =>
		getCommentByReviewId(reviewId)
			.then((cs) => setComments(cs))
			.catch((error) => console.log(error))

	const handleFollow = (userId) =>
		followUser(userId)
			.then(() => setIsFollowing(!isFollowing))
			.catch((error) => console.log(error))

	const handleReport = (reviewId) => {
		console.log('Not implemented yet')
	}

	return (
		<Card className='list-item review-card'>
			<Row className='list-review-item'>
				<Col md={3} className='bg-color' id='card-review-left'>
					<Row>
						{isUserView ? (
							<Link className='no-padding no-decoration' to={`/films?title=${encodeURIComponent(film?.title)}`}>
								<CardImg src={film?.poster} alt={film?.title} className='img-fluid film-img' />
								<h4 className='no-margin card-film-title card-left-info'>{film?.title}</h4>
							</Link>
						) : (
							<div style={{ alignItems: 'center', marginTop: '1rem' }}>
								<Link className='no-padding no-decoration left-side-card' to={`/users/${author?._id}`}>
									<CardImg src={author?.img} alt={author?.username} className='img-fluid rounded-circle author-img' />
									<h4 className='no-margin card-author-username card-left-info'>{author?.username}</h4>
								</Link>
								{currentUser && (
									<>
										{isFollowing ? (
											<Button className='no-border btn-review-card' onClick={() => handleFollow(author?._id)}>
												Unfollow
											</Button>
										) : (
											<Button className='btn-review-card' onClick={() => handleFollow(author?._id)}>
												Follow
											</Button>
										)}
									</>
								)}
							</div>
						)}
					</Row>
				</Col>
				<Col md={9} id='card-review-right'>
					<Card.Body>
						<Row>
							<Col>
								<StarIcon />{' '}
								<span>
									<b id='rating'>{rating}</b>/10
								</span>
								{showReviewFilmTitle && (
									<Link
										className='no-decoration link-color'
										style={{ marginLeft: '1rem' }}
										to={`/films?title=${encodeURIComponent(film?.title)}`}
									>
										{review.film.title}
									</Link>
								)}
								<span className='secondary-color' style={{ marginLeft: '1rem' }}>
									{new Date(review.createdAt).toLocaleDateString()}
								</span>
							</Col>
							<Col style={{ textAlign: 'right' }}>
								{currentUser && (
									<>
										{currentUser._id === author?._id || currentUser?._id === author ? (
											<Button
												className='btn-review-card link'
												id='btn-delete-review'
												style={{ marginLeft: '1rem' }}
												onClick={() => handleDelete(review._id)}
											>
												Delete
											</Button>
										) : (
											<Button
												className='btn-review-card'
												id='btn-report-review'
												style={{ marginLeft: '1rem' }}
												onClick={() => handleReport(review._id)}
											>
												Report
											</Button>
										)}
									</>
								)}
							</Col>
						</Row>
						<Row style={{ marginTop: '1rem' }}>
							<h5 className='review-title'>{title}</h5>
							<p className='review-content'>{content}</p>
						</Row>
						<Row style={{ marginTop: '1rem' }}>
							<Col>
								<span style={{ marginRight: '1rem' }} className={'secondary-color'}>
									{likes?.length} likes
								</span>
								<span
									onClick={() => setShowComments(!showComments)}
									className='secondary-color cursor-pointer link-on-hover'
								>
									{comments ? <>{comments.length}</> : <>{0}</>} comments
								</span>
							</Col>
							{currentUser && (
								<Col className='review-btn'>
									{likes?.includes(currentUser._id) ? (
										<Button
											style={{ marginRight: '1rem' }}
											className='btn-like btn-review-card'
											onClick={() => handleLike(review._id)}
										>
											Unlike
										</Button>
									) : (
										<Button
											style={{ marginRight: '1rem' }}
											className='btn-outline-primary btn-review-card color-link'
											onClick={() => handleLike(review._id)}
										>
											Like
										</Button>
									)}
									<Button className='btn-review-card' onClick={handleShowModalComment}>
										Comment
									</Button>
									<ModalComment
										show={showModalComment}
										reviewId={review._id}
										updateComments={updateComments}
										closeModalComment={handleCloseModalComment}
									/>
								</Col>
							)}
						</Row>
						<Row>
							{comments && comments.length > 0 && <>{showComments && <CommentList key={_id} comments={comments} />}</>}
						</Row>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	)
}

export default Review
