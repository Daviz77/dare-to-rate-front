import { createHttp } from './BaseService'

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)

export const getCurrentUser = () => authenticatedHttp.get('/profile').then((res) => res.data)

export const profileUpdate = (user) =>
	authenticatedHttp.patch('/users', user, { 'Content-Type': 'multipart/form-data' })

export const changeRole = (userId, cahngeRoleReq) =>
	authenticatedHttp.patch(`/users/${userId}/change-role`, cahngeRoleReq)

export const followUser = (userId) => authenticatedHttp.post(`/users/${userId}/follow`)

export const getUserFollowers = (userId) =>
	unauthenticatedHttp.get(`/users/${userId}/followers`).then((res) => res.data)

export const getUserFollowing = (userId) =>
	unauthenticatedHttp.get(`/users/${userId}/followings`).then((res) => res.data)

export const getUserById = (userId) => unauthenticatedHttp.get(`/users/${userId}`).then((res) => res.data)
