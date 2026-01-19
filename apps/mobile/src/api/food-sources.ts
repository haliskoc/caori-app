import { FoodData, searchByBarcode as searchOffByBarcode, searchByName as searchOffByName } from './open-food-facts';
import { searchUsdaByBarcode, searchUsdaByName } from './usda';

export async function searchFoodByBarcode(barcode: string, country: string = 'TR'): Promise<FoodData | null> {
  const offResult = await searchOffByBarcode(barcode, country);
  if (offResult) return offResult;

  const usdaResult = await searchUsdaByBarcode(barcode);
  if (usdaResult) return usdaResult;

  return null;
}

export async function searchFoodByName(query: string, country: string = 'TR'): Promise<FoodData[]> {
  const [offResults, usdaResults] = await Promise.all([
    searchOffByName(query, country),
    searchUsdaByName(query)
  ]);

  const seen = new Set<string>();
  const combined = [...offResults, ...usdaResults].filter(item => {
    const key = item.barcode || item.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return combined;
}
