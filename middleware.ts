import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { privateRoutes } from "./lib/routes"


export default auth(async function middleware(req) {
    const { nextUrl } = req
    const isLoggedIn = await auth()

    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)

    const isAuthRoute = nextUrl.pathname.includes("/auth")
    const isApiRoute = nextUrl.pathname.includes("/api")

    if (isApiRoute) {
        return;
    }
    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/home", nextUrl))
    }
    if (isAuthRoute && !isLoggedIn) {
        return;
    }
    if (!isLoggedIn && isPrivateRoute) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}