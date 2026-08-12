import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
    exp?: number;
};

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    if (!token) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    let decoded: JwtPayload;

    try {
        decoded = jwtDecode<JwtPayload>(token);
    } catch {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    const role =
        decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

  
    if (pathname.startsWith("/student")) {
        if (role === "Student") {
            return NextResponse.next();
        }

        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    if (pathname.startsWith("/teacher")) {
        if (role === "Teacher") {
            return NextResponse.next();
        }

        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    if (pathname.startsWith("/admin")) {
        if (role === "Admin") {
            return NextResponse.next();
        }

        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/student/:path*",
        "/teacher/:path*",
        "/admin/:path*",
    ],
};