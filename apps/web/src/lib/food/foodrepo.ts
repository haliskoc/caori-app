import { t } from "@/lib/core/i18n";
import { OFFProduct } from "@/lib/food/off";
import { coerceNumber, normalizeBarcode, parseServingSizeToGrams } from "@/lib/food/food-utils";

type FoodRepoProduct = Record<string, unknown>;

type FoodRepoResponse = Record<string, unknown>;

const FOODREPO_API_TOKEN = process.env.FOODREPO_API_TOKEN ?? "";
const FOODREPO_API_BASE = process.env.FOODREPO_API_BASE ?? "https://www.foodrepo.org/api/v3";

function hasFoodRepoKey() {
  return Boolean(FOODREPO_API_TOKEN);
}

function buildHeaders() {
  return {
    Authorization: `Token token=${FOODREPO_API_TOKEN}`,
  };
}

function extractList(payload: FoodRepoResponse) {
  if (Array.isArray(payload)) {
    return payload as FoodRepoProduct[];
  }
  const asRecord = payload as Record<string, unknown>;
  const list =
    (asRecord.products as FoodRepoProduct[]) ||
    (asRecord.data as FoodRepoProduct[]) ||
    (asRecord.items as FoodRepoProduct[]) ||
    (asRecord.results as FoodRepoProduct[]);
  if (Array.isArray(list)) {
    return list;
  }
  if (asRecord.product && typeof asRecord.product === "object") {
    return [asRecord.product as FoodRepoProduct];
  }
  return [];
}

function extractProductName(product: FoodRepoProduct) {
  const name =
    (product.product_name as string) ||
    (product.name as string) ||
    (product.title as string) ||
    "";
  return name.trim() || t("Bilinmeyen Ürün");
}

function extractImageUrl(product: FoodRepoProduct) {
  return (
    (product.image_url as string) ||
    (product.image_url_small as string) ||
    (product.image as string) ||
    undefined
  );
}

function extractServingSize(product: FoodRepoProduct) {
  return (
    parseServingSizeToGrams(product.serving_size, product.serving_size_unit) ??
    parseServingSizeToGrams(product.serving_size_g) ??
    parseServingSizeToGrams(product.portion_size, product.portion_unit) ??
    parseServingSizeToGrams(product.portion_quantity, product.portion_unit) ??
    parseServingSizeToGrams(product.serving_quantity, product.serving_quantity_unit)
  );
}

function extractNutrientFromObject(
  obj: Record<string, unknown> | null,
  keys: string[],
  unitHint?: string
) {
  if (!obj) return undefined;
  for (const key of keys) {
    if (key in obj) {
      const value = coerceNumber(obj[key]);
      if (typeof value === "number") {
        if (unitHint === "kj") {
          return value / 4.184;
        }
        return value;
      }
    }
  }
  return undefined;
}

function extractNutrientFromArray(items: unknown[], keys: string[]) {
  const lowerKeys = keys.map((key) => key.toLowerCase());
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const nameRaw =
      (record.name as string) ||
      (record.nutrient as string) ||
      (record.nutrient_name as string) ||
      "";
    const name = nameRaw.toLowerCase();
    if (!lowerKeys.includes(name)) {
      continue;
    }
    const value =
      coerceNumber(record.per_100g) ??
      coerceNumber(record.per100g) ??
      coerceNumber(record.value) ??
      coerceNumber(record.amount);
    if (typeof value !== "number") {
      continue;
    }
    const unit = String(record.unit ?? "").toLowerCase();
    return unit.includes("kj") ? value / 4.184 : value;
  }
  return undefined;
}

function extractNutrients(product: FoodRepoProduct) {
  const nutriments = product.nutriments as Record<string, unknown> | undefined;
  const nutrientsObject = (product.nutrients as Record<string, unknown>) || nutriments || null;
  const nutrientsArray = Array.isArray(product.nutrients) ? product.nutrients : null;

  const kcal =
    extractNutrientFromObject(nutrientsObject, ["energy-kcal_100g", "energy_kcal_100g", "kcal"]) ??
    extractNutrientFromObject(nutrientsObject, ["energy-kj_100g", "energy_kj_100g"], "kj") ??
    (nutrientsArray ? extractNutrientFromArray(nutrientsArray, ["energy", "energy kcal"]) : undefined);

  const protein =
    extractNutrientFromObject(nutrientsObject, ["proteins_100g", "protein_100g", "protein"]) ??
    (nutrientsArray ? extractNutrientFromArray(nutrientsArray, ["protein", "proteins"]) : undefined);

  const fat =
    extractNutrientFromObject(nutrientsObject, ["fat_100g", "total_fat_100g", "fat"]) ??
    (nutrientsArray ? extractNutrientFromArray(nutrientsArray, ["fat", "total fat"]) : undefined);

  const carbs =
    extractNutrientFromObject(nutrientsObject, ["carbohydrates_100g", "carbs_100g", "carbohydrates"]) ??
    (nutrientsArray ? extractNutrientFromArray(nutrientsArray, ["carbohydrates", "carbs"]) : undefined);

  return { kcal, protein, fat, carbs };
}

function mapFoodRepoProduct(product: FoodRepoProduct): OFFProduct | null {
  const name = extractProductName(product);
  const codeBase =
    String(product.barcode ?? "") ||
    String(product.id ?? "") ||
    String(product.product_id ?? "") ||
    name;

  const { kcal, protein, fat, carbs } = extractNutrients(product);
  const servingSizeG = extractServingSize(product);

  return {
    product_name: name,
    nutriments: {
      "energy-kcal_100g": kcal,
      proteins_100g: protein,
      fat_100g: fat,
      carbohydrates_100g: carbs,
    },
    image_url: extractImageUrl(product),
    code: `foodrepo-${codeBase}`,
    serving_size_g: servingSizeG,
  };
}

async function fetchFoodRepo(url: string) {
  const response = await fetch(url, {
    headers: buildHeaders(),
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as FoodRepoResponse;
}

export async function searchFoodRepo(query: string): Promise<OFFProduct[]> {
  if (!query || !hasFoodRepoKey()) {
    return [];
  }
  const urls = [
    `${FOODREPO_API_BASE}/products?search=${encodeURIComponent(query)}`,
    `${FOODREPO_API_BASE}/products?query=${encodeURIComponent(query)}`,
  ];
  for (const url of urls) {
    try {
      const payload = await fetchFoodRepo(url);
      if (!payload) {
        continue;
      }
      const products = extractList(payload);
      return products
        .map((product) => mapFoodRepoProduct(product))
        .filter((product): product is OFFProduct => Boolean(product));
    } catch (error) {
      console.error("FoodRepo search error:", error);
    }
  }
  return [];
}

export async function getFoodRepoByBarcode(barcode: string): Promise<OFFProduct | null> {
  if (!hasFoodRepoKey()) {
    return null;
  }
  const normalized = normalizeBarcode(barcode);
  if (!normalized) {
    return null;
  }
  const urls = [
    `${FOODREPO_API_BASE}/products?barcode=${normalized}`,
    `${FOODREPO_API_BASE}/products?barcodes=${normalized}`,
    `${FOODREPO_API_BASE}/products/${normalized}`,
  ];
  for (const url of urls) {
    try {
      const payload = await fetchFoodRepo(url);
      if (!payload) {
        continue;
      }
      const products = extractList(payload);
    const match =
      products.find(
        (product) => normalizeBarcode(String(product.barcode ?? "")) === normalized
      ) ?? products[0];
      return match ? mapFoodRepoProduct(match) : null;
    } catch (error) {
      console.error("FoodRepo barcode error:", error);
    }
  }
  return null;
}
