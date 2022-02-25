import cookie from "cookie"

export const getToken = (req) => {
  const encodeCookie = req?.headers?.cookie || ""
  return cookie.parse(encodeCookie)?.token
}
