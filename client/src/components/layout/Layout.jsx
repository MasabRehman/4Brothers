import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { api } from '../../services/api';
import { X, Facebook, Instagram, Linkedin } from 'lucide-react';

const Layout = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const openPopup = (e, key) => {
    e.preventDefault();
    setActivePopup({
      title: e.target.innerText,
      content: settings[key] || 'Coming soon...'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface font-body-md antialiased max-w-full">
      <Header />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      
      {/* Dynamic Popups */}
      {activePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setActivePopup(null)}>
          <div className="bg-surface-container border-t-4 border-secondary rounded shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <h2 className="text-xl font-headline-md font-bold text-on-surface uppercase tracking-wider">{activePopup.title}</h2>
              <button onClick={() => setActivePopup(null)} className="text-on-surface-variant hover:text-secondary transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 text-on-surface-variant whitespace-pre-wrap leading-relaxed max-h-[70vh] overflow-y-auto">
              {activePopup.content}
            </div>
          </div>
        </div>
      )}

      {/* Footer (Responsive combination) */}
      <footer className="w-full mt-auto bg-primary text-on-primary font-body-sm text-body-sm border-t border-secondary/20 md:border-t md:border-secondary/20">
        <div className="max-w-container-max mx-auto px-4 md:px-margin py-10 md:py-stack-lg grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-gutter">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-4">
            <div className="font-headline-sm text-headline-sm font-bold text-on-primary">4Brothers</div>
            <p className="text-xs md:text-sm text-on-primary/80 uppercase tracking-wider md:normal-case md:tracking-normal">
              One Company. Every Need.
            </p>
            <div className="w-full border-t border-on-primary/10 pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-on-primary">
                <span className="material-symbols-outlined text-secondary">support_agent</span>
                <span className="font-label-md text-label-md">{settings.contact_phone || '0300-1234567'}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-on-primary/80 mt-1">
                <a href={settings.social_facebook || '#'} target={settings.social_facebook ? "_blank" : "_self"} rel="noopener noreferrer" className="hover:text-secondary transition-colors cursor-pointer">
                  <Facebook size={20} />
                </a>
                <a href={settings.social_instagram || '#'} target={settings.social_instagram ? "_blank" : "_self"} rel="noopener noreferrer" className="hover:text-secondary transition-colors cursor-pointer">
                  <Instagram size={20} />
                </a>
                <a href={settings.social_linkedin || '#'} target={settings.social_linkedin ? "_blank" : "_self"} rel="noopener noreferrer" className="hover:text-secondary transition-colors cursor-pointer">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 md:gap-2 text-center md:text-left">
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" onClick={(e) => openPopup(e, 'popup_about_us')}>About Us</a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" onClick={(e) => openPopup(e, 'popup_bulk_orders')}>Bulk Orders</a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" onClick={(e) => openPopup(e, 'popup_sustainability')}>Sustainability</a>
          </div>
          
          <div className="flex flex-col gap-3 md:gap-2 text-center md:text-left">
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" onClick={(e) => openPopup(e, 'popup_compliance')}>Compliance</a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" onClick={(e) => openPopup(e, 'popup_contact_us')}>Contact Us</a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" onClick={(e) => openPopup(e, 'popup_terms')}>Terms of Service</a>
            <Link className="text-secondary/80 hover:text-secondary transition-colors font-bold mt-2" to="/admin/login">Admin Login</Link>
          </div>

        </div>
        
        <div className="border-t border-on-primary/10"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-margin py-5 text-center text-xs text-on-primary/70 md:text-sm">
          © 2024 4Brothers Industrial Supply. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
