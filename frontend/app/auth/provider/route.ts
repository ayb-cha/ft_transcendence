import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = (request: NextRequest) => {
  const token = request.nextUrl.searchParams.get("access_token") ?? "";

  const cookieStore = cookies();
  let redirectUrl = new URL(process.env["FRONTEND_BASEURL"] as string);
  cookieStore.set("access_token", token, { httpOnly: false, secure: false });

  if (request.nextUrl.searchParams.get("2fa"))
    redirectUrl.pathname = "/auth/2fa";
  else redirectUrl.pathname = "/dashboard";

  return NextResponse.redirect(redirectUrl, 301);
};
