import Review from '../review/Review'

function ReviewList(props) {
	const { isUserView, reviews } = props

	return (
		<div className='review-list'>
			{reviews.map((review) => (
        <Review key={review._id} review={review} isUserView={isUserView}/>
			))}
		</div>
	)
}

export default ReviewList
