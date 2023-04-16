import { createHttp } from './BaseService'

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)

export const getReviews = () => unauthenticatedHttp.get('/reviews').then(res => res.data.reviews)

export const getAuthReviews = () => authenticatedHttp.get('/reviews').then((res) => res.data)

export const getReviewsByUserId = (userId) => unauthenticatedHttp.get(`/users/${userId}/reviews`).then((res) => res.data)

export const createReview = (reviewRequest) => authenticatedHttp.post('/reviews', reviewRequest)

export const likeReview = (reviewId) => authenticatedHttp.post(`/reviews/${reviewId}/like`)