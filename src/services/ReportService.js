import { createHttp } from './BaseService'

const authenticatedHttp = createHttp(true)

export const reportReviewById = (reportReq, reviewId) =>
	authenticatedHttp.post(`/reviews/${reviewId}/report`, reportReq)

export const reportCommentById = (commentId, reportReq) =>
	authenticatedHttp.post(`/comments/${commentId}/report`, reportReq)

export const listAllReports = () => authenticatedHttp.get('/reports')
