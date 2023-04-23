import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

function ModalReview() {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			<Button variant='primary' onClick={handleShow}>
				Create a new review
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>New review</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Title</Form.Label>
							<Form.Control type='text' placeholder='Title here...' autoFocus/>
						</Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Content</Form.Label>
							<Form.Control type='textarea' rows={5} placeholder='Write what you thing...' />
						</Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Rating</Form.Label>
							<Form.Control type='number' />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ModalReview
