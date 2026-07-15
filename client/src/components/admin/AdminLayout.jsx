import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, PackageSearch, ClipboardList, LogOut, Settings, Menu, X } from 'lucide-react';
import { api } from '../../services/api';
import defaultLogo from '../../assets/logo.png';

const AdminLayout = ({ children }) => {
  const { adminUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState({});

  React.useEffect(() => {
    api.getSettings().then(res => {
      if (res.data) setSettings(res.data);
    }).catch(console.error);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex font-body-md">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-primary-container border-r border-outline-variant flex flex-col fixed h-full z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <div className="flex items-center">
            <img src={settings.site_logo || defaultLogo} alt="Logo" className="h-10 object-contain mr-3" />
            <div>
              <h1 className="font-headline-md font-bold text-xl text-secondary tracking-widest leading-none uppercase">ADMIN</h1>
              <span className="text-on-primary-container/70 text-[10px] tracking-widest uppercase font-label-bold">Control Panel</span>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-on-primary-container/70 hover:text-on-primary-container">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-grow py-6 px-4 space-y-2 overflow-y-auto">
          <Link onClick={() => setMobileMenuOpen(false)} to="/admin/dashboard" className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${isActive('/admin/dashboard') ? 'bg-secondary text-on-secondary-fixed font-bold' : 'text-on-primary-container/70 hover:bg-primary hover:text-on-primary'}`}>
            <LayoutDashboard size={20} />
            <span className="font-label-md">Dashboard</span>
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/admin/products" className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${isActive('/admin/products') ? 'bg-secondary text-on-secondary-fixed font-bold' : 'text-on-primary-container/70 hover:bg-primary hover:text-on-primary'}`}>
            <PackageSearch size={20} />
            <span className="font-label-md">Products & Inventory</span>
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/admin/categories" className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${isActive('/admin/categories') ? 'bg-secondary text-on-secondary-fixed font-bold' : 'text-on-primary-container/70 hover:bg-primary hover:text-on-primary'}`}>
            <PackageSearch size={20} />
            <span className="font-label-md">Categories</span>
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/admin/orders" className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${isActive('/admin/orders') ? 'bg-secondary text-on-secondary-fixed font-bold' : 'text-on-primary-container/70 hover:bg-primary hover:text-on-primary'}`}>
            <ClipboardList size={20} />
            <span className="font-label-md">Order Management</span>
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} to="/admin/settings" className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${isActive('/admin/settings') ? 'bg-secondary text-on-secondary-fixed font-bold' : 'text-on-primary-container/70 hover:bg-primary hover:text-on-primary'}`}>
            <Settings size={20} />
            <span className="font-label-md">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-outline-variant/30 mt-auto">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-secondary">
              {adminUser?.first_name?.[0] || 'A'}
            </div>
            <div className="flex flex-col overflow-hidden text-on-primary-container">
              <span className="text-sm font-bold truncate">{adminUser?.first_name} {adminUser?.last_name}</span>
              <span className="text-[10px] text-on-primary-container/70 uppercase font-label-bold">{adminUser?.role?.replace('_', ' ')}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-sm text-error hover:text-error/80 w-full px-2 py-2 transition-colors">
            <LogOut size={16} />
            <span className="font-label-bold uppercase">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 bg-surface min-h-screen w-full">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-primary-container border-b border-outline-variant p-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setMobileMenuOpen(true)} className="text-on-primary-container hover:text-secondary">
            <Menu size={28} />
          </button>
          <div className="font-headline-md font-bold text-lg text-secondary tracking-widest leading-none">ADMIN</div>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        <div className="p-4 md:p-8 overflow-x-hidden text-on-surface">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
