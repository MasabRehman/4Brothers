import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#f6efe1] w-full top-0 sticky z-50 border-b border-outline-variant shadow-sm relative">
      <div className="max-w-container-max mx-auto px-4 md:px-margin flex items-center justify-between h-16 md:h-20 gap-4">

        {/* Left Side: Mobile Menu Toggle & Logo */}
        <div className="flex items-center flex-none gap-2">
          <button className="md:hidden p-1 text-primary hover:bg-surface-container-low rounded transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="4Brothers" className="h-10 md:h-14 object-contain" onError={(e) => { e.target.onerror = null; e.target.src = '/4bro.png'; }} />
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-center gap-gutter font-body-md text-body-md text-primary">
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Medicines</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Groceries</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Home Needs</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Office Needs</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Construction</a>
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-end gap-2 md:gap-stack-md flex-none">
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
          <a className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" href="#">Medicines</a>
          <a className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" href="#">Groceries</a>
          <a className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" href="#">Home Needs</a>
          <a className="px-4 py-3 border-b border-outline-variant/30 active:bg-surface-variant" href="#">Office Needs</a>
          <a className="px-4 py-3 active:bg-surface-variant" href="#">Construction</a>
        </div>
      )}
    </header>
  );
};

export default Header;
