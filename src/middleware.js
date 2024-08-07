import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // Token will be available here if user is authenticated
    const token = req.nextauth.token;
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    console.log(token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 1,
    },
  },
)

export const config = { matcher: ["/dashboard", "/asset-data", "/submission", "/employee-management"] }