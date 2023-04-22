import React from 'react'
import Comment from '../comment/Comment'
import { Row } from 'react-bootstrap'

function CommentList(props) {
	const { comments } = props

	return (
		<Row style={{marginTop: '1rem'}}>
    <h4>Comments</h4>
			{comments.map((comment) => (
				<Comment key={comment._id} comment={comment} />
			))}
		</Row>
	)
}

export default CommentList
