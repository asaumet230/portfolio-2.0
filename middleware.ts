import { auth } from "@/config/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === "/login";
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isLoginPage && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
