import { ListGroup, Row } from 'react-bootstrap'
import Review from '../review/Review'

function ReviewList(props) {
	const { isUserView, reviews } = props

	return (
		<>
			{reviews && (
				<Row>
					{reviews.map((review) => (
						<Review key={review._id} review={review} isUserView={isUserView} />
					))}
				</Row>
			)}
		</>
	)
}

export default ReviewList
