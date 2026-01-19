import { getDatabase } from '../index';

export interface FoodLibraryItem {
  id: string;
  user_id?: string;
  name: string;
  calories_per_100?: number;
  protein_per_100?: number;
  carbs_per_100?: number;
  fat_per_100?: number;
  barcode?: string;
  image_url?: string;
  source?: string;
  favorite: boolean;
}

export const FoodLibraryRepository = {
  async insert(item: FoodLibraryItem) {
    const db = await getDatabase();
    await db.runAsync(
      \`INSERT INTO food_library (id, user_id, name, calories_per_100, protein_per_100, carbs_per_100, fat_per_100, barcode, image_url, source, favorite)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\`,
      [item.id, item.user_id || null, item.name, item.calories_per_100 || null, item.protein_per_100 || null, item.carbs_per_100 || null, item.fat_per_100 || null, item.barcode || null, item.image_url || null, item.source || null, item.favorite ? 1 : 0]
    );
  },

  async getAll() {
    const db = await getDatabase();
    const results = await db.getAllAsync<any>('SELECT * FROM food_library ORDER BY favorite DESC, name ASC');
    return results.map(r => ({ ...r, favorite: !!r.favorite }));
  },

  async search(query: string) {
    const db = await getDatabase();
    const results = await db.getAllAsync<any>(
      'SELECT * FROM food_library WHERE name LIKE ? OR barcode LIKE ? ORDER BY favorite DESC, name ASC',
      [\`%\${query}%\`, \`%\${query}%\`]
    );
    return results.map(r => ({ ...r, favorite: !!r.favorite }));
  },

  async delete(id: string) {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM food_library WHERE id = ?', [id]);
  }
};
