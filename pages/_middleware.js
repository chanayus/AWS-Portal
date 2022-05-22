import { NextResponse } from "next/server"

export const middleware = (req, res) => {
  if (req?.cookies?.token){
      if (req.nextUrl.pathname === '/login')
          return NextResponse.redirect('/')
      else
          return NextResponse.next()
  }
  else{
      if (req.nextUrl.pathname === '/login')
          return NextResponse.next()
      else if (req.nextUrl.pathname.split('/')[1] === 'api')
          return NextResponse.next()
      else
          return NextResponse.redirect('/login')
  }
  return NextResponse.next()
}
