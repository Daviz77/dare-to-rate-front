import { createHttp } from './BaseService'

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)

export const createComment = (commentReq, reviewId) => authenticatedHttp.post(`/reviews/${reviewId}/comments`, commentReq )

export const getCommentByReviewId = (reviewId) => unauthenticatedHttp.get(`/reviews/${reviewId}/comments`).then(res => res.data)

export const deleteComment = (commentId) => authenticatedHttp.delete(`/comments/${commentId}`)

export const updateComment = (commentId, commentReq) => authenticatedHttp.patch(`/comments/${commentId}/update`, commentReq)