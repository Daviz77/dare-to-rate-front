import { createHttp } from './BaseService'

const unauthenticatedHttp = createHttp(false)

export const getFilmByTitle = (title) => unauthenticatedHttp.get(`/films?title=${title}`).then((res) => res.data)

export const getFilmById = (filmId) => unauthenticatedHttp.get(`/films/${filmId}`).then((res) => res.data)

export const getFilmReviews = (filmId) => unauthenticatedHttp.get(`/films/${filmId}/reviews`).then((res) => res.data)