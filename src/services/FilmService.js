import { createHttp } from './BaseService'

const unauthenticatedHttp = createHttp(false)

export const filterFilmByTitle = (title) => unauthenticatedHttp.get(`/films?title=${title}`).then((res) => res.data)

export const filterFilmById = (filmId) => unauthenticatedHttp.get(`/films/${filmId}`).then((res) => res.data)