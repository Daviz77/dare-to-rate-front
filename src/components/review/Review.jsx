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
	const { review, isUserView } = props
	const { currentUser } = useContext(AuthContext)
	const [likes, setLikes] = useState(review.likes)
	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState(review.comments)
	const [isFollowing, setIsFollowing] = useState(currentUser?.followings.includes(review.author?._id))
	const { _id, title, author, film, content, rating } = review
	const [deleteUserReview, setDeleteUserReview] = useState(false)
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
			.then(() => setDeleteUserReview(true))
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

	return (
		<Card className='list-item'>
			<Row>
				<Col md={2} className='no-margin-left bg-color'>
					<Row className='margin-1'>
						{isUserView ? (
							<Link className='no-padding no-decoration' to={`/films?title=${encodeURIComponent(film?.title)}`}>
								<CardImg src={film?.poster} alt={film?.title} className='img-fluid' />
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
								{currentUser && (
									<>
										{isFollowing ? (
											<span className='link-color follow-btn' onClick={() => handleFollow(author?._id)}>
												Unfollow
											</span>
										) : (
											<Button onClick={() => handleFollow(author?._id)}>Follow</Button>
										)}
									</>
								)}
							</>
						)}
					</Row>
				</Col>
				<Col md={10}>
					<Card.Body>
						<Row>
							<Col>
								<StarIcon />{' '}
								<span>
									<b id='rating'>{rating}</b>/10
								</span>
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
									{comments ? <>{comments.length}</> : <>{0}</>} comments
								</span>
							</Col>
							{currentUser && (
								<Col className='review-btn'>
									{likes.includes(currentUser._id) ? (
										<Button
											style={{ marginRight: '1rem' }}
											className='btn-outline-primary'
											onClick={() => handleLike(review._id)}
										>
											Unlike
										</Button>
									) : (
										<Button
											style={{ marginRight: '1rem' }}
											className='btn-primary'
											onClick={() => handleLike(review._id)}
										>
											Like
										</Button>
									)}
									<Button onClick={handleShowModalComment}>Add Comment</Button>
									<ModalComment
										show={showModalComment}
										reviewId={review._id}
										updateComments={updateComments}
										closeModalComment={handleCloseModalComment}
									/>

									{currentUser && currentUser._id === author._id && (
										<Button
											className='btn-delete'
											style={{ marginLeft: '1rem' }}
											onClick={() => handleDelete(review._id)}
										>
											Delete
										</Button>
									)}
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
