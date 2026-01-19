import axios from "axios";
import { FoodData } from "./open-food-facts";

// USDA API Key from environment variable
// Get a free API key at https://fdc.nal.usda.gov/api-key-signup.html
const USDA_API_KEY = process.env.EXPO_PUBLIC_USDA_API_KEY || "";
const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

export async function searchUsdaByBarcode(
  barcode: string,
): Promise<FoodData | null> {
  if (!USDA_API_KEY) return null;

  try {
    const response = await axios.get(`${USDA_BASE_URL}/foods/search`, {
      params: {
        api_key: USDA_API_KEY,
        query: barcode,
        pageSize: 1,
        dataType: ["Branded"],
      },
      timeout: 10000,
    });

    const food = response.data.foods?.[0];
    if (!food) return null;

    // Map USDA nutrients to our FoodData format
    const getNutrient = (name: string) =>
      food.foodNutrients.find((n: any) =>
        n.nutrientName.toLowerCase().includes(name.toLowerCase()),
      )?.value || 0;

    return {
      barcode: barcode,
      name: food.description,
      brand: food.brandName,
      calories: getNutrient("Energy"),
      protein: getNutrient("Protein"),
      carbs: getNutrient("Carbohydrate"),
      fat: getNutrient("Total lipid"),
      servingSize: `${food.servingSize} ${food.servingSizeUnit}`,
      imageUrl: undefined,
    };
  } catch (error) {
    console.error("USDA API error:", error);
    return null;
  }
}

export async function searchUsdaByName(query: string): Promise<FoodData[]> {
  if (!USDA_API_KEY) return [];

  try {
    const response = await axios.get(`${USDA_BASE_URL}/foods/search`, {
      params: {
        api_key: USDA_API_KEY,
        query: query,
        pageSize: 10,
      },
      timeout: 10000,
    });

    return (response.data.foods || []).map((food: any) => {
      const getNutrient = (name: string) =>
        food.foodNutrients.find((n: any) =>
          n.nutrientName.toLowerCase().includes(name.toLowerCase()),
        )?.value || 0;

      return {
        barcode: food.gtinUpc || food.fdcId.toString(),
        name: food.description,
        brand: food.brandName,
        calories: getNutrient("Energy"),
        protein: getNutrient("Protein"),
        carbs: getNutrient("Carbohydrate"),
        fat: getNutrient("Total lipid"),
        servingSize: `${food.servingSize} ${food.servingSizeUnit}`,
      } as FoodData;
    });
  } catch (error) {
    console.error("USDA API search error:", error);
    return [];
  }
}
