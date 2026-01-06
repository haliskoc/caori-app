import { getAuthUrl } from "@/lib/google-fit";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = getAuthUrl();
  return NextResponse.redirect(url);
};
