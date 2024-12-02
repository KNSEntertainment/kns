import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export { default } from "next/server";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { pathname } = req.nextUrl;

	if (!token && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	if (token && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
