import { t } from "@/lib/core/i18n";
import { OFFProduct } from "@/lib/food/off";
import { coerceNumber, normalizeBarcode, parseServingSizeToGrams } from "@/lib/food/food-utils";

type FdcFoodNutrient = {
  nutrientId?: number;
  nutrientName?: string;
  unitName?: string;
  value?: number;
  amount?: number;
};

type FdcLabelNutrients = Record<string, { value?: number } | number | null>;

type FdcFood = {
  fdcId?: number;
  description?: string;
  brandName?: string;
  gtinUpc?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  foodNutrients?: FdcFoodNutrient[];
  labelNutrients?: FdcLabelNutrients;
};

type FdcSearchResponse = {
  foods?: FdcFood[];
};

const USDA_API_KEY = process.env.USDA_FDC_API_KEY ?? "";
const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

function hasUsdaKey() {
  return Boolean(USDA_API_KEY);
}

function buildUsdaUrl(path: string, params: Record<string, string>) {
  const url = new URL(`${USDA_BASE_URL}${path}`);
  url.searchParams.set("api_key", USDA_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

function getLabelValue(value: FdcLabelNutrients[keyof FdcLabelNutrients]) {
  if (typeof value === "number") {
    return value;
  }
  return coerceNumber(value?.value);
}

function extractLabelNutrients(label?: FdcLabelNutrients) {
  if (!label) {
    return null;
  }
  const kcal = getLabelValue(label.calories);
  const protein = getLabelValue(label.protein);
  const fat = getLabelValue(label.fat);
  const carbs = getLabelValue(label.carbohydrates);
  const hasAny =
    typeof kcal === "number" ||
    typeof protein === "number" ||
    typeof fat === "number" ||
    typeof carbs === "number";
  if (!hasAny) {
    return null;
  }
  return { kcal, protein, fat, carbs };
}

function extractNutrientValue(
  nutrients: FdcFoodNutrient[] | undefined,
  nutrientId: number,
  fallbackNames: string[]
) {
  if (!nutrients) return undefined;
  const byId = nutrients.find((item) => item.nutrientId === nutrientId);
  const byIdValue = coerceNumber(byId?.value ?? byId?.amount);
  if (typeof byIdValue === "number") {
    return byIdValue;
  }
  const lowered = fallbackNames.map((name) => name.toLowerCase());
  const byName = nutrients.find((item) => {
    if (!item.nutrientName) return false;
    return lowered.includes(item.nutrientName.toLowerCase());
  });
  return coerceNumber(byName?.value ?? byName?.amount);
}

function mapFdcFood(food: FdcFood): OFFProduct | null {
  const description = food.description?.trim();
  const brand = food.brandName?.trim();
  const name =
    description && brand && !description.toLowerCase().includes(brand.toLowerCase())
      ? `${description} (${brand})`
      : description || brand || t("Bilinmeyen Ürün");

  const servingSizeG = parseServingSizeToGrams(food.servingSize, food.servingSizeUnit);
  const labelNutrients = extractLabelNutrients(food.labelNutrients);
  let kcal = labelNutrients?.kcal;
  let protein = labelNutrients?.protein;
  let fat = labelNutrients?.fat;
  let carbs = labelNutrients?.carbs;

  if (!labelNutrients) {
    kcal = extractNutrientValue(food.foodNutrients, 1008, ["energy", "energy kcal"]);
    protein = extractNutrientValue(food.foodNutrients, 1003, ["protein"]);
    fat = extractNutrientValue(food.foodNutrients, 1004, ["total lipid (fat)", "fat"]);
    carbs = extractNutrientValue(food.foodNutrients, 1005, ["carbohydrate, by difference"]);
  }

  if (labelNutrients && typeof servingSizeG === "number" && servingSizeG > 0) {
    const factor = 100 / servingSizeG;
    kcal = typeof kcal === "number" ? kcal * factor : undefined;
    protein = typeof protein === "number" ? protein * factor : undefined;
    fat = typeof fat === "number" ? fat * factor : undefined;
    carbs = typeof carbs === "number" ? carbs * factor : undefined;
  }

  return {
    product_name: name,
    nutriments: {
      "energy-kcal_100g": kcal,
      proteins_100g: protein,
      fat_100g: fat,
      carbohydrates_100g: carbs,
    },
    image_url: undefined,
    code: food.gtinUpc ? `usda-${food.gtinUpc}` : `usda-${food.fdcId ?? name}`,
    serving_size_g: servingSizeG,
  };
}

export async function searchUsdaFood(query: string): Promise<OFFProduct[]> {
  if (!query || !hasUsdaKey()) {
    return [];
  }
  try {
    const url = buildUsdaUrl("/foods/search", {
      query,
      pageSize: "10",
      dataType: "Branded,Foundation,SR Legacy",
    });
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    const data = (await response.json()) as FdcSearchResponse;
    return (data.foods ?? [])
      .map((food) => mapFdcFood(food))
      .filter((food): food is OFFProduct => Boolean(food));
  } catch (error) {
    console.error("USDA search error:", error);
    return [];
  }
}

export async function getUsdaFoodByBarcode(barcode: string): Promise<OFFProduct | null> {
  if (!hasUsdaKey()) {
    return null;
  }
  const normalized = normalizeBarcode(barcode);
  if (!normalized) {
    return null;
  }
  try {
    const url = buildUsdaUrl("/foods/search", {
      query: normalized,
      pageSize: "5",
      dataType: "Branded",
      requireAllWords: "true",
    });
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as FdcSearchResponse;
    const foods = data.foods ?? [];
    const match =
      foods.find((food) => normalizeBarcode(food.gtinUpc ?? "") === normalized) ?? foods[0];
    return match ? mapFdcFood(match) : null;
  } catch (error) {
    console.error("USDA barcode error:", error);
    return null;
  }
}
