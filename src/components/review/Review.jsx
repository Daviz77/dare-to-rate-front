import React, { useContext, useEffect, useState } from 'react'
import { getFilmById } from '../../services/FilmService'
import CommentList from '../commentList/CommentList'
import AuthContext from '../../contexts/AuthContext'
import { createReview, likeReview } from '../../services/ReviewService'
import { Link } from 'react-router-dom'
import { followUser } from '../../services/UserService'
import { Button, Card, CardImg, Col, ListGroupItem, Row } from 'react-bootstrap'
import { createComment, getCommentByReviewId } from '../../services/CommentService'
import './Review.css'

function Review(props) {
	const { review, isUserView } = props
	const { currentUser } = useContext(AuthContext)
	const [film, setFilm] = useState({})
	const [likes, setLikes] = useState(review.likes)
	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState(review.comments)
	const [isFollowing, setIsFollowing] = useState(currentUser?.followings.includes(review.author?._id))
	const [newReview, setNewReview] = useState({})
	const { _id, title, author, content, rating } = review

	useEffect(() => {
		console.log(likes.includes(currentUser?._id));
		if (isUserView && review.film) {
			getFilmById(review.film)
				.then((f) => setFilm(f))
				.catch((error) => console.log(error))
		}
	}, [review.filmId, isUserView])

	const handleLike = (reviewId) => {
		likeReview(reviewId)
			.then((r) => setLikes(r.likes))
			.catch((error) => console.log(error))
	}

	const updateComments = (reviewId) =>
		getCommentByReviewId(reviewId)
			.then((cs) => setComments(cs))
			.catch((error) => console.log(error))

	const handleNewComment = (commentRequest) =>
		createComment(commentRequest)
			.then(() => updateComments(commentRequest.reviewId))
			.catch((error) => console.log(error))

	const handleFollow = (userId) =>
		followUser(userId)
			.then(() => setIsFollowing(!isFollowing))
			.catch((error) => console.log(error))

	return (
		<Card className='list-item'>
			<Row>
				<Col md={2} className='no-margin-left bg-color'>
					<Row className='margin-1'>
						{isUserView ? (
							<Link className='no-padding no-decoration' to={`/films?title=${encodeURIComponent(film?.title)}`}>
								<CardImg src={film?.img} alt={film?.title} className='img-fluid rounded' />
								<h4 className='no-margin card-film-title'>{film?.title}</h4>
							</Link>
						) : (
							<>
								<Link className='no-padding no-decoration' to={`/users/${author?._id}`}>
									<CardImg src={author?.img} alt={author?.username} className='img-fluid rounded-circle author-img' />
									<h4 className='no-margin card-author-username' style={{ marginTop: '.5rem' }}>
										{author?.username}
									</h4>
								</Link>
								{currentUser && currentUser._id !== author?._id && isFollowing ? (
									<p className='link-color follow-btn' onClick={() => handleFollow(author?._id)}>
										Unfollow
									</p>
								) : (
									<Button onClick={() => handleFollow(author?._id)}>Follow</Button>
								)}
							</>
						)}
					</Row>
				</Col>
				<Col md={10}>
					<Card.Body>
						<Row>
							<Col>
								<span>Rating: {rating}</span>
							</Col>
							<Col style={{ textAlign: 'right' }}>
								<span className='link-color'>Report</span>
							</Col>
						</Row>
						<Row style={{ marginTop: '1rem' }}>
							<h4 className='review-title'>{title}</h4>
							<Card.Text className='review-content'>{content}</Card.Text>
						</Row>
						<Row style={{ marginTop: '1rem' }}>
							<Col>
								<span style={{ marginRight: '1rem' }} className={'secondary-color'}>
									{likes.length} likes
								</span>
								<span
									onClick={() => setShowComments(!showComments)}
									className='secondary-color cursor-pointer link-on-hover'
								>
									{comments?.length} comments
								</span>
							</Col>
							{currentUser && (
								<Col style={{ textAlign: 'right' }}>
									<Button
										style={{ marginRight: '1rem' }}
										className={likes.includes(currentUser._id) ? '' : 'outline-primary'}
										onClick={() => handleLike(review._id)}
									>
										Like
									</Button>
									<Button onClick={() => handleNewComment(review._id)}>Add comment</Button>
								</Col>
							)}
						</Row>
						<Row>
							<div className='col-sm-12'>
								{review.comments && review.comments.length > 0 && (
									<>{showComments && <CommentList key={_id} comments={review.comments} />}</>
								)}
							</div>
						</Row>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	)
}

export default Review
