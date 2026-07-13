const settingsService = require('../services/settingsService');

/**
 * Get all company settings
 * Public route
 */
exports.getAll = async (req, res, next) => {
  try {
    const settings = await settingsService.getAllSettings();
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update multiple company settings
 * Admin route
 */
exports.update = async (req, res, next) => {
  try {
    const newSettings = req.body;
    const updatedSettings = await settingsService.updateSettings(newSettings);
    
    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Admin Credentials
 * Admin route
 */
exports.updateCredentials = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const { email, password } = req.body;
    
    if (!email && !password) {
      return res.status(400).json({ success: false, message: 'No credentials provided to update' });
    }

    const bcrypt = require('bcryptjs');
    const db = require('../config/database');

    const updates = [];
    const params = [];

    if (email) {
      updates.push('email = ?');
      params.push(email);
    }
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      updates.push('password_hash = ?');
      params.push(hash);
    }

    params.push(adminId);

    if (updates.length > 0) {
      const sql = `UPDATE admins SET ${updates.join(', ')} WHERE id = ?`;
      await db.query(sql, params);
    }

    res.status(200).json({
      success: true,
      message: 'Admin credentials updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
