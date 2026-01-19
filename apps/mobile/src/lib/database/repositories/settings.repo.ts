import { getDatabase } from '../index';

export interface DatabaseSettings {
  id: string;
  user_id?: string;
  country: string;
  auto_detect_country: boolean;
  locale: string;
  theme_mode: string;
  dark_mode: boolean;
  reminder_enabled: boolean;
  reminder_time: string;
}

export const SettingsRepository = {
  async getSettings(userId: string = 'default') {
    const db = await getDatabase();
    const result = await db.getFirstAsync<any>(
      'SELECT * FROM settings WHERE id = ? OR user_id = ?',
      [userId, userId]
    );
    
    if (!result) return null;
    
    return {
      ...result,
      auto_detect_country: !!result.auto_detect_country,
      dark_mode: !!result.dark_mode,
      reminder_enabled: !!result.reminder_enabled,
    } as DatabaseSettings;
  },

  async upsert(settings: DatabaseSettings) {
    const db = await getDatabase();
    const existing = await this.getSettings(settings.id);
    
    if (existing) {
      await db.runAsync(
        'UPDATE settings SET country = ?, auto_detect_country = ?, locale = ?, theme_mode = ?, dark_mode = ?, reminder_enabled = ?, reminder_time = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [
          settings.country, settings.auto_detect_country ? 1 : 0, settings.locale,
          settings.theme_mode, settings.dark_mode ? 1 : 0, settings.reminder_enabled ? 1 : 0,
          settings.reminder_time, settings.id
        ]
      );
    } else {
      await db.runAsync(
        'INSERT INTO settings (id, user_id, country, auto_detect_country, locale, theme_mode, dark_mode, reminder_enabled, reminder_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          settings.id, settings.user_id || null, settings.country, 
          settings.auto_detect_country ? 1 : 0, settings.locale,
          settings.theme_mode, settings.dark_mode ? 1 : 0, settings.reminder_enabled ? 1 : 0,
          settings.reminder_time
        ]
      );
    }
  }
};
