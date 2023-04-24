import { createHttp } from "./BaseService"

const http = createHttp(false)

export const login = ({ email, password }) =>
	http.post("/login", { email, password })

export const signup = (user) => {
	return http.post("/signup", user, { 'Content-Type': 'multipart/form-data' })
}
