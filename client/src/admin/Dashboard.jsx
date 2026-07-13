import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Package, ShoppingCart, DollarSign, Users, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const { adminUser } = useAuth();
  const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0 });
  const [cleared, setCleared] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await api.adminGetDashboardStats();
        if (statsData.success) {
          setStats(s => ({ 
            ...s, 
            orders: statsData.data.total_orders || 0,
            products: statsData.data.total_products || 0,
            revenue: statsData.data.total_revenue || 0
          }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (!cleared) fetchStats();
  }, [cleared]);

  const handleClear = () => {
    setStats({ orders: 0, products: 0, revenue: 0 });
    setCleared(true);
    setShowConfirm(false);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-display text-3xl text-primary-container">Dashboard Overview</h1>
          <p className="text-on-surface-variant font-body-md mt-1">Welcome back, {adminUser?.first_name}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {cleared && (
            <button
              onClick={() => { setCleared(false); }}
              className="font-label-bold uppercase tracking-widest text-on-surface-variant hover:text-primary-container border border-outline px-4 py-2 rounded transition-colors"
            >
              Refresh Stats
            </button>
          )}
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 font-label-bold uppercase tracking-widest text-error hover:text-on-error bg-error-container hover:bg-error border border-error-container px-4 py-2 rounded transition-colors"
          >
            <Trash2 size={15} /> Clear Dashboard
          </button>
        </div>
      </div>

      {/* Confirmation prompt */}
      {showConfirm && (
        <div className="mb-6 bg-error-container border border-error rounded p-4 flex items-center justify-between">
          <p className="text-on-error-container font-body-sm font-bold">Clear all displayed stats from the dashboard view?</p>
          <div className="flex gap-3">
            <button onClick={() => setShowConfirm(false)} className="font-label-bold uppercase text-on-error-container hover:text-error px-3 py-1 rounded border border-error/50 transition-colors">Cancel</button>
            <button onClick={handleClear} className="font-label-bold uppercase text-on-error bg-error hover:brightness-110 px-4 py-1 rounded transition-colors">Yes, Clear</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Stat Cards */}
        <div className="industrial-card p-4 md:p-6 rounded relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-on-surface-variant font-label-bold uppercase tracking-wider mb-2">Total Orders</h3>
            <p className="text-2xl md:text-4xl font-headline-display text-primary-container">{stats.orders}</p>
          </div>
          <ShoppingCart className="absolute right-[-10px] bottom-[-10px] text-primary-container/10 w-24 h-24 group-hover:scale-110 transition-transform" />
        </div>

        <div className="industrial-card p-4 md:p-6 rounded relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-on-surface-variant font-label-bold uppercase tracking-wider mb-2">Total Products</h3>
            <p className="text-2xl md:text-4xl font-headline-display text-primary-container">{cleared ? 0 : stats.products}</p>
          </div>
          <Package className="absolute right-[-10px] bottom-[-10px] text-secondary/10 w-24 h-24 group-hover:scale-110 transition-transform" />
        </div>

        <div className="industrial-card p-4 md:p-6 rounded relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-on-surface-variant font-label-bold uppercase tracking-wider mb-2">Revenue (Delivered)</h3>
            <p className="text-xl md:text-4xl font-headline-display text-secondary">
              Rs. {Number(stats.revenue).toLocaleString()}
            </p>
          </div>
          <DollarSign className="absolute right-[-10px] bottom-[-10px] text-secondary/10 w-24 h-24 group-hover:scale-110 transition-transform" />
        </div>

        <div className="industrial-card p-4 md:p-6 rounded relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-on-surface-variant font-label-bold uppercase tracking-wider mb-2">Total Customers</h3>
            <p className="text-2xl md:text-4xl font-headline-display text-primary-container">--</p>
          </div>
          <Users className="absolute right-[-10px] bottom-[-10px] text-primary-container/10 w-24 h-24 group-hover:scale-110 transition-transform" />
        </div>
      </div>
      
      {/* Excel Sync Status */}
      <div className="industrial-card p-6 rounded mb-8 flex items-center justify-between border-l-4 border-l-secondary">
        <div>
          <h3 className="font-headline-sm font-bold text-primary-container mb-1">Excel Synchronization is Active</h3>
          <p className="font-body-sm text-on-surface-variant">Master order sheet is located at <code className="bg-surface-variant text-secondary-fixed-dim px-2 py-0.5 rounded">/exports/orders_master.xlsx</code></p>
        </div>
        <div className="bg-primary-fixed text-on-primary-fixed-variant text-xs font-label-bold px-3 py-1 rounded-full border border-primary-fixed-dim animate-pulse uppercase tracking-widest">
          SYNCING
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
