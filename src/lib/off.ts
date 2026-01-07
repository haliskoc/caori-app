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

export const searchFood = async (query: string): Promise<OFFProduct[]> => {
  if (!query) return [];

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=10`
    );
    const data = (await response.json()) as OFFSearchResponse;
    
    return (data.products ?? []).map((p, index) => ({
      product_name: p.product_name || p.product_name_tr || "Bilinmeyen Ürün",
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
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = (await response.json()) as OFFBarcodeResponse;

    if (data.status === 1) {
      const p = data.product;
      return {
        product_name: p?.product_name || p?.product_name_tr || "Bilinmeyen Ürün",
        nutriments: {
          "energy-kcal_100g": p?.nutriments?.["energy-kcal_100g"],
          proteins_100g: p?.nutriments?.proteins_100g,
          fat_100g: p?.nutriments?.fat_100g,
          carbohydrates_100g: p?.nutriments?.carbohydrates_100g,
        },
        image_url: p?.image_url,
        code: p?.code ?? barcode,
      };
    }
    return null;
  } catch (error) {
    console.error("Open Food Facts barcode error:", error);
    return null;
  }
};
