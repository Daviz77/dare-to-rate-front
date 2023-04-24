import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { createReview } from '../../services/ReviewService'
import AuthContext from '../../contexts/AuthContext'

function ModalReview({ show, filmId, imdbId, closeModal, addReview }) {
	const { currentUser } = useContext(AuthContext)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [rating, setRating] = useState(0)

	const handleSubmit = (e) => {
		e.preventDefault()
		const newReview = {
			review: {
				title,
				content,
				rating,
			},
			film: {
				_id: filmId,
				imdbId,
			},
		}
		createReview(newReview)
			.then((res) => {
				addReview({
					...res.data,
					author: { username: currentUser.username, _id: currentUser._id, img: currentUser.img },
				})
				closeModal()
			})
			.catch((err) => {
				console.log(err)
				closeModal()
			})
	}

	return (
		<>
			<Modal show={show} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>New review</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								placeholder='Title here...'
								autoFocus
								onChange={(event) => setTitle(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Content</Form.Label>
							<Form.Control
								as='textarea'
								type='number'
								rows={5}
								placeholder='Write what you thing...'
								onChange={(event) => setContent(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlSelect1'>
							<Form.Label>Rating</Form.Label>
							<Form.Select onChange={(event) => setRating(event.target.value)}>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
								<option value='6'>6</option>
								<option value='7'>7</option>
								<option value='8'>8</option>
								<option value='9'>9</option>
								<option value='10'>10</option>
							</Form.Select>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' type='submit' onClick={handleSubmit}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ModalReview
