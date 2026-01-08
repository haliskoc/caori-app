import { t } from "./i18n";

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

function normalizeBarcode(input: string) {
  return input.replace(/\D/g, "");
}

function mapProduct(product: OFFApiProduct | undefined, fallbackCode: string): OFFProduct | null {
  if (!product) return null;
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

export const searchFood = async (query: string): Promise<OFFProduct[]> => {
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
    }));
  } catch (error) {
    console.error("Open Food Facts search error:", error);
    return [];
  }
};

export const getFoodByBarcode = async (barcode: string): Promise<OFFProduct | null> => {
  try {
    const normalized = normalizeBarcode(barcode);
    if (!normalized) {
      return null;
    }
    const preferTr = normalized.startsWith("868") || normalized.startsWith("869");
    const domains = preferTr ? [TR_OFF, WORLD_OFF] : [WORLD_OFF, TR_OFF];
    for (const domain of domains) {
      const product = await fetchBarcodeFrom(domain, normalized);
      if (product) {
        return product;
      }
    }
    return null;
  } catch (error) {
    console.error("Open Food Facts barcode error:", error);
    return null;
  }
};
