import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import './Comment.css'
import { Link } from 'react-router-dom'

function Comment(props) {
	const { comment } = props
	const { author, content } = comment

	return (
		<Card className='comment-card'>
			<Row>
				<Col md={1} className='avatar-img'>
					<Link className='no-padding' to={`/users/${author?._id}`}>
						<img src={author.img} alt='avatar' className='comment-avatar' />
					</Link>
				</Col>
				<Col md={11}>
					<Link className='no-padding no-decoration' to={`/users/${author?._id}`}>
						<p className='comment-username card-author-username'>{author.username}</p>
					</Link>
					<p className='comment-content'>{content}</p>
				</Col>
			</Row>
		</Card>
	)
}

export default Comment
