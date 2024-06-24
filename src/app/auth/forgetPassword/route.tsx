"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  try {
    if (!code) {
      throw new Error("code is not defined");
    }
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(
      `${requestUrl.protocol}//${requestUrl.host}/change_password`,
    );
  } catch (error) {
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}
