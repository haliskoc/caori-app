import { getFoodByBarcodeAll, searchFoodAll } from "@/lib/food/food-sources";
import { NextRequest, NextResponse } from "next/server";
import { ensureUser } from "@/lib/database/db";
import { getApiPrincipal } from "@/lib/auth/api-auth";

export const GET = async (req: NextRequest) => {
  const principal = await getApiPrincipal(req);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });

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

  return NextResponse.json(
    { error: "Missing query or barcode" },
    { status: 400 },
  );
};
