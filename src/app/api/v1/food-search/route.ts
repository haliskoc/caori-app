import { getFoodByBarcodeAll, searchFoodAll } from "@/lib/food/food-sources";
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { ensureUser } from "@/lib/database/db";

export const GET = async (req: NextRequest) => {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureUser(session.user);

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const barcode = searchParams.get("barcode");

  if (barcode) {
    const product = await getFoodByBarcodeAll(barcode);
    return NextResponse.json(product);
  }

  if (q) {
    const products = await searchFoodAll(q);
    return NextResponse.json(products);
  }

  return NextResponse.json({ error: "Missing query or barcode" }, { status: 400 });
};
