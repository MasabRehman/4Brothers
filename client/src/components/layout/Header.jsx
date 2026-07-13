import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#f6efe1] w-full top-0 sticky z-50 border-b border-outline-variant shadow-sm">
      <div className="max-w-container-max mx-auto px-4 md:px-margin flex items-center justify-between h-16 md:h-20 gap-4">

        {/* Left Side: Logo */}
        <div className="flex items-center flex-none">
          <Link to="/" className="flex items-center">
            <img src="/4bro.png" alt="4Brothers" className="h-12 md:h-14 object-contain" />
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-gutter font-body-md text-body-md text-primary">
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Medicines</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Groceries</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Home Needs</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Office Needs</a>
          <a className="cursor-pointer active:opacity-80 hover:text-secondary transition-colors text-primary" href="#">Construction</a>
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-end gap-stack-md flex-none">
          <button className="md:hidden p-2 text-primary hover:bg-surface-container-low transition-all rounded-full scale-95 duration-150">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="hidden md:inline font-label-bold text-label-bold text-primary-container border border-primary-container px-4 py-2 rounded hover:bg-surface-variant transition-colors uppercase tracking-widest">
            Track Order
          </button>
          <button className="hidden md:inline font-label-bold text-label-bold text-on-primary bg-primary-container px-6 py-2 rounded industrial-shadow hover:brightness-110 transition-all uppercase tracking-widest">
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
