import React from 'react'
import Comment from '../comment/Comment'

function CommentList(props) {
	const { comments } = props

	return (
		<div className='comment-list'>
			{comments.map((comment) => (
				<Comment key={comment._id} comment={comment} />
			))}
		</div>
	)
}

export default CommentList
