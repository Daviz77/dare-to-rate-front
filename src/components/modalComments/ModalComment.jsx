import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { createComment } from '../../services/CommentService'
import { Container } from 'react-bootstrap'

function ModalComment({ show, reviewId, updateComments, closeModalComment }) {
	const [comment, setComment] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		const newComment = { content: comment }

		createComment(newComment, reviewId)
			.then((res) => {
				updateComments(reviewId)
				closeModalComment()
			})
			.catch((err) => console.log(err))
	}

	return (
		<Container>
			<Modal show={show} onHide={closeModalComment}>
				<Modal.Header closeButton>
					<Modal.Title>Create a new comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Content</Form.Label>
							<Form.Control as='textarea' rows={3} type='number' autoFocus onChange={(event) => setComment(event.target.value)} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={handleSubmit}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default ModalComment
