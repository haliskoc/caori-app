import { OFFProduct, getFoodByBarcode, searchFood } from "@/lib/food/off";
import { getFoodRepoByBarcode, searchFoodRepo } from "@/lib/food/foodrepo";
import { getUsdaFoodByBarcode, searchUsdaFood } from "@/lib/food/usda";

function dedupeProducts(products: OFFProduct[]) {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (!product.code) {
      return false;
    }
    if (seen.has(product.code)) {
      return false;
    }
    seen.add(product.code);
    return true;
  });
}

export async function searchFoodAll(query: string): Promise<OFFProduct[]> {
  if (!query) {
    return [];
  }
  const [offResults, usdaResults, foodRepoResults] = await Promise.all([
    searchFood(query),
    searchUsdaFood(query),
    searchFoodRepo(query),
  ]);

  return dedupeProducts([...offResults, ...usdaResults, ...foodRepoResults]);
}

export async function getFoodByBarcodeAll(barcode: string): Promise<OFFProduct | null> {
  if (!barcode) {
    return null;
  }
  const offMatch = await getFoodByBarcode(barcode);
  if (offMatch) {
    return offMatch;
  }
  const [usdaMatch, foodRepoMatch] = await Promise.all([
    getUsdaFoodByBarcode(barcode),
    getFoodRepoByBarcode(barcode),
  ]);
  return usdaMatch ?? foodRepoMatch ?? null;
}
