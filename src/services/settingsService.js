const settingsRepository = require('../repositories/settingsRepository');
const cache = require('../utils/cache');

const SETTINGS_CACHE_KEY = 'site_settings';
const CACHE_TTL = 300; // 5 minutes

const settingsService = {
  /**
   * Get all settings (always fresh)
   */
  getAllSettings: async () => {
    return await settingsRepository.getAllAsMap();
  },

  /**
   * Update multiple settings (admin only)
   */
  updateSettings: async (settingsMap) => {
    if (!settingsMap || Object.keys(settingsMap).length === 0) {
      return;
    }

    await settingsRepository.upsertMultiple(settingsMap);
    
    // Invalidate cache
    cache.del(SETTINGS_CACHE_KEY);
    
    return await settingsRepository.getAllAsMap();
  }
};

module.exports = settingsService;
