import { Row } from 'react-bootstrap'
import Review from '../review/Review'
import { useState } from 'react'

function ReviewList(props) {
	const { isUserView, reviews, showReviewFilmTitle, deleteUserReview } = props


	return (
		<>
			{reviews && (
				<Row>
					{reviews.map((review) => (
						<Review
							key={review._id}
							review={review}
							isUserView={isUserView}
							showReviewFilmTitle={showReviewFilmTitle}
							deleteUserReview={deleteUserReview}
						/>
					))}
				</Row>
			)}
		</>
	)
}

export default ReviewList
