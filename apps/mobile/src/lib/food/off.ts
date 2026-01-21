import { t } from "@/lib/i18n";
import { normalizeBarcode, parseServingSizeToGrams } from "@/lib/food/food-utils";

export interface OFFProduct {
  product_name: string;
  nutriments: {
    "energy-kcal_100g"?: number;
    proteins_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
  };
  image_url?: string;
  code: string;
  serving_size_g?: number;
}

type OFFApiProduct = {
  product_name?: string;
  product_name_tr?: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    proteins_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
  };
  image_url?: string;
  code?: string;
  serving_size?: string;
  serving_quantity?: number;
  serving_quantity_unit?: string;
  product_quantity?: number;
  product_quantity_unit?: string;
};

type OFFSearchResponse = {
  products?: OFFApiProduct[];
};

type OFFBarcodeResponse = {
  status?: number;
  product?: OFFApiProduct;
};

const WORLD_OFF = "https://world.openfoodfacts.org";
const TR_OFF = "https://tr.openfoodfacts.org";

function mapProduct(product: OFFApiProduct | undefined, fallbackCode: string): OFFProduct | null {
  if (!product) return null;
  const servingSize =
    parseServingSizeToGrams(product.serving_size) ??
    parseServingSizeToGrams(product.serving_quantity, product.serving_quantity_unit) ??
    parseServingSizeToGrams(product.product_quantity, product.product_quantity_unit);
  return {
    product_name: product.product_name || product.product_name_tr || t("Bilinmeyen Ürün"),
    nutriments: {
      "energy-kcal_100g": product.nutriments?.["energy-kcal_100g"],
      proteins_100g: product.nutriments?.proteins_100g,
      fat_100g: product.nutriments?.fat_100g,
      carbohydrates_100g: product.nutriments?.carbohydrates_100g,
    },
    image_url: product.image_url,
    code: product.code ?? fallbackCode,
    serving_size_g: servingSize,
  };
}

async function fetchBarcodeFrom(baseUrl: string, barcode: string): Promise<OFFProduct | null> {
  const response = await fetch(`${baseUrl}/api/v0/product/${barcode}.json`);
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as OFFBarcodeResponse;
  if (data.status === 1 && data.product) {
    return mapProduct(data.product, barcode);
  }
  return null;
}

export async function searchFood(query: string): Promise<OFFProduct[]> {
  if (!query) return [];

  try {
    const response = await fetch(
      `${WORLD_OFF}/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=10`
    );
    const data = (await response.json()) as OFFSearchResponse;

    return (data.products ?? []).map((p, index) => ({
      product_name: p.product_name || p.product_name_tr || t("Bilinmeyen Ürün"),
      nutriments: {
        "energy-kcal_100g": p.nutriments?.["energy-kcal_100g"],
        proteins_100g: p.nutriments?.proteins_100g,
        fat_100g: p.nutriments?.fat_100g,
        carbohydrates_100g: p.nutriments?.carbohydrates_100g,
      },
      image_url: p.image_url,
      code: p.code ?? `unknown-${index}`,
      serving_size_g:
        parseServingSizeToGrams(p.serving_size) ??
        parseServingSizeToGrams(p.serving_quantity, p.serving_quantity_unit) ??
        parseServingSizeToGrams(p.product_quantity, p.product_quantity_unit),
    }));
  } catch {
    return [];
  }
}

export async function getFoodByBarcode(barcode: string): Promise<OFFProduct | null> {
  try {
    const normalized = normalizeBarcode(barcode);
    if (!normalized) {
      return null;
    }
    const domains = [WORLD_OFF, TR_OFF];
    for (const domain of domains) {
      const product = await fetchBarcodeFrom(domain, normalized);
      if (product) {
        return product;
      }
    }
    return null;
  } catch {
    return null;
  }
}
