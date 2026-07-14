import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { api } from '../../services/api';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState(() => {
    const cached = localStorage.getItem('company_categories');
    return cached ? JSON.parse(cached) : [];
  });
  const [settings, setSettings] = useState(() => {
    const cached = localStorage.getItem('company_settings');
    return cached ? JSON.parse(cached) : {};
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.getCategories();
        if (res.data) {
          setCategories(res.data);
          localStorage.setItem('company_categories', JSON.stringify(res.data));
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const getCatId = (name) => {
    const cat = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    return cat ? `/category/${cat.id}` : "#";
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.data) {
          setSettings(res.data);
          localStorage.setItem('company_settings', JSON.stringify(res.data));
        }
      } catch (err) {
        console.error('Error fetching site settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const logoSrc = settings.site_logo || settings.logo;

  return (
    <header className="bg-[#f6efe1] w-full top-0 sticky z-50 border-b border-outline-variant shadow-sm relative">
      <div className="max-w-container-max mx-auto px-4 md:px-margin flex items-center justify-between h-16 md:h-20 gap-4 relative">

        {/* Left Side: Mobile Menu Toggle (Mobile) / Logo (Desktop) */}
        <div className="flex items-center flex-none md:w-auto justify-start gap-2 md:gap-0">
          <button className="md:hidden p-1 text-primary hover:bg-surface-container-low rounded transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {logoSrc && (
            <Link to="/" className="hidden md:flex items-center justify-start">
              <img src={logoSrc} alt="4Brothers" className="h-14 object-contain" />
            </Link>
          )}
        </div>

        {/* Center: Logo (Mobile) / Navigation (Desktop) */}
        <div className="flex justify-center items-center flex-1 relative">
          {/* Mobile Logo */}
          {logoSrc && (
            <Link to="/" className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
              <img src={logoSrc} alt="4Brothers" className="h-10 object-contain" />
            </Link>
          )}

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden md:flex flex-1 justify-center gap-gutter font-body-md text-body-md text-primary">
          <Link className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" to={getCatId('Medicines')}>Medicines</Link>
          <Link className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" to={getCatId('Groceries')}>Groceries</Link>
          <Link className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" to={getCatId('Home Needs')}>Home Needs</Link>
          <Link className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" to={getCatId('Office Needs')}>Office Needs</Link>
          <Link className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" to={getCatId('Construction')}>Construction</Link>
        </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-end gap-2 md:gap-stack-md flex-none w-1/3 md:w-auto">
          <button className="p-2 text-primary hover:bg-surface-container-low transition-all rounded-full scale-95 duration-150">
            <Search size={22} />
          </button>
          <button className="hidden md:inline font-label-bold text-label-bold text-primary-container border border-primary-container px-4 py-2 rounded hover:bg-surface-variant transition-colors uppercase tracking-widest">
            Track Order
          </button>
          <button className="font-label-bold text-[10px] md:text-label-bold text-on-primary bg-primary-container px-3 md:px-6 py-2 rounded industrial-shadow hover:brightness-110 transition-all uppercase tracking-widest">
            Order Now
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#f6efe1] border-b border-outline-variant shadow-lg flex flex-col font-body-md text-primary">
          <Link className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" to={getCatId('Medicines')}>Medicines</Link>
          <Link className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" to={getCatId('Groceries')}>Groceries</Link>
          <Link className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" to={getCatId('Home Needs')}>Home Needs</Link>
          <Link className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" to={getCatId('Office Needs')}>Office Needs</Link>
          <Link className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" to={getCatId('Construction')}>Construction</Link>
          <Link className="px-4 py-3 active:bg-surface-variant text-secondary/80 hover:text-secondary transition-colors font-bold" to="/admin/login">Admin Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
