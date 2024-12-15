import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export { default } from "next/server";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { pathname } = req.nextUrl;

	if (!token && pathname.startsWith("/gurungknsadmin1234")) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (token && pathname.startsWith("/gurungknsadmin1234")) {
		return NextResponse.redirect(new URL("/gurungknsadmin1234", req.url));
	}
}

export const config = {
	matcher: ["/gurungknsadmin1234/:path*"],
};
