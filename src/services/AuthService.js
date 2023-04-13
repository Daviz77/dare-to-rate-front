import { createHttp } from "./BaseService"

const http = createHttp(false)

export const login = ({ email, password }) =>
	http.post("/login", { email, password })

  export const signup = ({ email, username, password, img}) => {
    return http.post("/signup", { email, username, password, img});
  };