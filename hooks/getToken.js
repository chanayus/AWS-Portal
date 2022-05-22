import cookie from "cookie"

export const getToken = (req) => {
  const encodeCookie = req?.headers?.cookie || ""
  if (encodeCookie){
    return cookie.parse(encodeCookie)?.token
  }
  else{
    return ""
  }
}
