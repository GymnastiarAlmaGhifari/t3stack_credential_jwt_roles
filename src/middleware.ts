import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN" || token === null,
    },
  }
);

export const config = { matcher: ["/admin", "/dashboard"] };
