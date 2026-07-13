import React, { useState, useEffect } from 'react';
import { Save, Loader, Key } from 'lucide-react';
import { api } from '../services/api';

const Settings = () => {
  const [settings, setSettings] = useState({
    contact_phone: '',
    contact_email: '',
    social_facebook: '',
    social_instagram: '',
    social_linkedin: '',
    popup_about_us: '',
    popup_bulk_orders: '',
    popup_sustainability: '',
    popup_compliance: '',
    popup_contact_us: '',
    popup_terms: ''
  });
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingCredentials, setSavingCredentials] = useState(false);
  const [message, setMessage] = useState('');
  const [credentialsMessage, setCredentialsMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.getSettings();
      if (res.data) {
        setSettings(prev => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      await api.adminUpdateSettings(settings);
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email && !credentials.password) {
      setCredentialsMessage('Please enter an email or password to update.');
      setTimeout(() => setCredentialsMessage(''), 3000);
      return;
    }

    setSavingCredentials(true);
    setCredentialsMessage('');
    
    try {
      await api.adminUpdateCredentials(credentials);
      setCredentialsMessage('Credentials updated successfully!');
      setCredentials({ email: '', password: '' });
      setTimeout(() => setCredentialsMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setCredentialsMessage('Failed to update credentials.');
    } finally {
      setSavingCredentials(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full text-on-surface"><Loader className="w-8 h-8 animate-spin text-secondary" /></div>;
  }

  return (
    <div className="text-on-surface pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-orbitron tracking-wider text-secondary">Site Settings</h1>
      </div>

      {/* Admin Credentials */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/30 pb-2">
          <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
            <Key size={20} />
            Update Admin Credentials
          </h2>
          <button 
            onClick={handleCredentialsSubmit}
            disabled={savingCredentials}
            className="flex items-center space-x-2 bg-red-900 text-red-100 px-4 py-1.5 rounded font-bold hover:bg-red-800 transition-colors disabled:opacity-50 text-sm border border-red-700"
          >
            {savingCredentials ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Update Credentials</span>
          </button>
        </div>

        {credentialsMessage && (
          <div className={`p-3 mb-4 text-sm rounded ${credentialsMessage.includes('successfully') ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
            {credentialsMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">New Email Address</label>
            <input 
              type="email" name="email" value={credentials.email} onChange={handleCredentialsChange}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
              placeholder="Leave blank to keep current"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">New Password</label>
            <input 
              type="password" name="password" value={credentials.password} onChange={handleCredentialsChange}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
              placeholder="Leave blank to keep current"
              minLength={6}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 mb-6">
        <h2 className="text-xl font-bold font-orbitron tracking-wider text-secondary">Public Configuration</h2>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center space-x-2 bg-primary-container text-on-primary px-4 py-2 rounded font-bold hover:brightness-110 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{saving ? 'Saving...' : 'Save Config'}</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('successfully') ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
          {message}
        </div>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        
        {/* Contact Info */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b border-outline-variant/30 pb-2 text-secondary">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="text" name="contact_phone" value={settings.contact_phone || ''} onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="+92 333 3818933"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" name="contact_email" value={settings.contact_email || ''} onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="info@virktools.com"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b border-outline-variant/30 pb-2 text-secondary">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Facebook URL</label>
              <input 
                type="text" name="social_facebook" value={settings.social_facebook || ''} onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Instagram URL</label>
              <input 
                type="text" name="social_instagram" value={settings.social_instagram || ''} onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">LinkedIn URL</label>
              <input 
                type="text" name="social_linkedin" value={settings.social_linkedin || ''} onChange={handleChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Popup Texts */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b border-outline-variant/30 pb-2 text-secondary">Footer Links Content (Popups)</h2>
          <p className="text-sm text-on-surface-variant mb-6">These texts will appear in a popup when users click the corresponding links in the Footer.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">About Us</label>
              <textarea 
                name="popup_about_us" value={settings.popup_about_us || ''} onChange={handleChange}
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="Enter About Us content..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Bulk Orders</label>
              <textarea 
                name="popup_bulk_orders" value={settings.popup_bulk_orders || ''} onChange={handleChange}
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="Enter Bulk Orders content..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Sustainability</label>
              <textarea 
                name="popup_sustainability" value={settings.popup_sustainability || ''} onChange={handleChange}
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="Enter Sustainability content..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Compliance</label>
              <textarea 
                name="popup_compliance" value={settings.popup_compliance || ''} onChange={handleChange}
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="Enter Compliance content..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Contact Us</label>
              <textarea 
                name="popup_contact_us" value={settings.popup_contact_us || ''} onChange={handleChange}
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="Enter Contact Us content..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Terms of Service</label>
              <textarea 
                name="popup_terms" value={settings.popup_terms || ''} onChange={handleChange}
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="Enter Terms of Service content..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
