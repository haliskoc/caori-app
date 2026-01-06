import { searchFood, getFoodByBarcode } from "@/lib/off";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const barcode = searchParams.get("barcode");

  if (barcode) {
    const product = await getFoodByBarcode(barcode);
    return NextResponse.json(product);
  }

  if (q) {
    const products = await searchFood(q);
    return NextResponse.json(products);
  }

  return NextResponse.json({ error: "Missing query or barcode" }, { status: 400 });
};
