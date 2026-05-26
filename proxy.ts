import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const { pathname } = request.nextUrl;

    if(!session && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if(session && pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"], // Specify the routes the middleware applies to
};