import React from 'react'

function Comment(props) {
	const { comment } = props
  const { author, content } = comment

	return (
		<div className='review'>
			<p>By {author.username}</p>
			<p>{content}</p>
		</div>
	)
}

export default Comment
