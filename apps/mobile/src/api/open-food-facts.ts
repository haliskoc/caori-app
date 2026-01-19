import axios from "axios";

// User agent required by Open Food Facts API guidelines
const USER_AGENT = "CalAI Mobile App - contact@calai.app";

export interface OpenFoodFactsProduct {
  code: string;
  product_name?: string;
  product_name_en?: string;
  product_name_tr?: string;
  generic_name?: string;
  brands?: string;
  image_url?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    "energy-kcal"?: number;
    energy_100g?: number;
    energy?: number;
    proteins_100g?: number;
    proteins?: number;
    carbohydrates_100g?: number;
    carbohydrates?: number;
    fat_100g?: number;
    fat?: number;
    fiber_100g?: number;
    sugars_100g?: number;
    salt_100g?: number;
    sodium_100g?: number;
    saturated_fat_100g?: number;
  };
  serving_size?: string;
  serving_quantity?: number;
  nutrition_grades?: string;
  nutriscore_grade?: string;
  nova_group?: number;
  categories?: string;
  categories_tags?: string[];
  ingredients_text?: string;
  allergens_tags?: string[];
  quantity?: string;
}

export interface FoodData {
  barcode: string;
  name: string;
  brand?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  servingSize?: string;
  imageUrl?: string;
  nutritionGrade?: string;
  categories?: string[];
}

// Normalize barcode - remove spaces and leading zeros for EAN-13
function normalizeBarcode(barcode: string): string {
  return barcode.trim().replace(/\s/g, "");
}

// Calculate calories from energy if kcal not available
function calculateCalories(
  nutriments: OpenFoodFactsProduct["nutriments"],
): number {
  if (!nutriments) return 0;

  if (nutriments["energy-kcal_100g"] && nutriments["energy-kcal_100g"] > 0) {
    return Math.round(nutriments["energy-kcal_100g"]);
  }
  if (nutriments["energy-kcal"] && nutriments["energy-kcal"] > 0) {
    return Math.round(nutriments["energy-kcal"]);
  }
  if (nutriments["energy_100g"] && nutriments["energy_100g"] > 0) {
    return Math.round(nutriments["energy_100g"] * 0.239);
  }
  if (nutriments.energy && nutriments.energy > 0) {
    return Math.round(nutriments.energy * 0.239);
  }

  return 0;
}

export async function searchByBarcode(
  barcode: string,
  country: string = "world",
): Promise<FoodData | null> {
  const normalizedBarcode = normalizeBarcode(barcode);
  if (!normalizedBarcode || normalizedBarcode.length < 8) return null;

  // Try country specific API first, then fallback to world
  const countries = [country.toLowerCase(), "world"];
  if (country.toLowerCase() === "world") countries.pop(); // Avoid duplicate calls if world is selected

  for (const c of countries) {
    try {
      const apiBase = `https://${c}.openfoodfacts.org/api/v2`;
      const response = await axios.get(
        `${apiBase}/product/${normalizedBarcode}`,
        {
          params: {
            fields:
              "code,product_name,product_name_en,product_name_tr,generic_name,brands,image_front_url,image_front_small_url,image_url,nutriments,serving_size,serving_quantity,nutrition_grades,nutriscore_grade,categories_tags,quantity",
          },
          headers: { "User-Agent": USER_AGENT },
          timeout: 10000,
        },
      );

      const data = response.data;
      if (data && data.status === 1 && data.product) {
        const product = data.product;
        const nutriments = product.nutriments || {};
        const calories = calculateCalories(nutriments);
        const name =
          product.product_name_tr ||
          product.product_name ||
          product.product_name_en ||
          product.generic_name ||
          "Bilinmeyen Ürün";
        const imageUrl =
          product.image_front_url ||
          product.image_front_small_url ||
          product.image_url;
        const nutritionGrade = (
          product.nutriscore_grade ||
          product.nutrition_grades ||
          ""
        )
          .toUpperCase()
          .charAt(0);

        return {
          barcode: normalizedBarcode,
          name: name.trim(),
          brand: product.brands?.split(",")[0]?.trim(),
          calories,
          protein:
            Math.round(
              (nutriments.proteins_100g || nutriments.proteins || 0) * 10,
            ) / 10,
          carbs:
            Math.round(
              (nutriments.carbohydrates_100g || nutriments.carbohydrates || 0) *
                10,
            ) / 10,
          fat:
            Math.round((nutriments.fat_100g || nutriments.fat || 0) * 10) / 10,
          fiber: Math.round((nutriments.fiber_100g || 0) * 10) / 10,
          sugar: Math.round((nutriments.sugars_100g || 0) * 10) / 10,
          servingSize: product.serving_size || product.quantity || "100g",
          imageUrl,
          nutritionGrade: nutritionGrade || undefined,
          categories: product.categories_tags?.slice(0, 3),
        };
      }
    } catch (error) {
      console.log(`OFF ${c} error:`, error);
    }
  }

  return null;
}

export async function searchByName(
  query: string,
  country: string = "world",
  page: number = 1,
): Promise<FoodData[]> {
  if (!query || query.trim().length < 2) return [];

  const apiBase = `https://${
    country.toLowerCase() === "world" ? "world" : country.toLowerCase()
  }.openfoodfacts.org/api/v2`;

  try {
    const response = await axios.get(`${apiBase}/search`, {
      params: {
        search_terms: query.trim(),
        page_size: 24,
        page,
        fields:
          "code,product_name,product_name_en,product_name_tr,generic_name,brands,image_front_url,image_front_small_url,nutriments,serving_size,nutrition_grades,nutriscore_grade",
        sort_by: "unique_scans_n",
      },
      headers: { "User-Agent": USER_AGENT },
      timeout: 15000,
    });

    if (!response.data.products || response.data.products.length === 0)
      return [];

    return response.data.products
      .filter((p: OpenFoodFactsProduct) => {
        const hasName = p.product_name || p.product_name_en || p.generic_name;
        const hasCalories =
          p.nutriments &&
          (p.nutriments["energy-kcal_100g"] ||
            p.nutriments["energy-kcal"] ||
            p.nutriments["energy_100g"]);
        return hasName && hasCalories;
      })
      .map((product: OpenFoodFactsProduct) => {
        const nutriments = product.nutriments || {};
        const calories = calculateCalories(nutriments);
        const name =
          product.product_name ||
          product.product_name_en ||
          product.generic_name ||
          "Unknown";
        const nutritionGrade = (
          product.nutriscore_grade ||
          product.nutrition_grades ||
          ""
        )
          .toUpperCase()
          .charAt(0);

        return {
          barcode: product.code || "",
          name: name.trim(),
          brand: product.brands?.split(",")[0]?.trim(),
          calories,
          protein: Math.round((nutriments.proteins_100g || 0) * 10) / 10,
          carbs: Math.round((nutriments.carbohydrates_100g || 0) * 10) / 10,
          fat: Math.round((nutriments.fat_100g || 0) * 10) / 10,
          servingSize: product.serving_size || "100g",
          imageUrl: product.image_front_url || product.image_front_small_url,
          nutritionGrade: nutritionGrade || undefined,
        } as FoodData;
      });
  } catch (error) {
    console.error("OFF search error:", error);
    return [];
  }
}
