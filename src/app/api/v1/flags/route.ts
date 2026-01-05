import { NextResponse } from "next/server";
import { defaultFlags } from "@/lib/flags";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(defaultFlags);
}
