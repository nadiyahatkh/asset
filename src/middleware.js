import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Prevent role 1 (admin) from accessing the root page "/"
    if (token.role === 1 && req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/user") {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Prevent role 2 from accessing any page other than "/"
    if (token.role === 2 && req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Allow access if the user has a token
    },
  },
)

export const config = {
  matcher: [
    "/dashboard", 
    "/asset-data", 
    "/submission", 
    "/employee-management",
    "/",
    "/user"
  ]
}
