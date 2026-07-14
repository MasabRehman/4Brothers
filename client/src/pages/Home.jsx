import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Home = () => {
  const [settings, setSettings] = useState(() => {
    const cached = localStorage.getItem('company_settings');
    return cached ? JSON.parse(cached) : {};
  });
  const [categories, setCategories] = useState(() => {
    const cached = localStorage.getItem('company_categories');
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.data) {
          setSettings(res.data);
          localStorage.setItem('company_settings', JSON.stringify(res.data));
        }
      } catch (err) {
        console.error('Error fetching settings for homepage:', err);
      }
    };
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
    fetchSettings();
    fetchCategories();
  }, []);

  const getCatId = (name) => {
    const cat = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    return cat ? `/category/${cat.id}` : "#";
  };

  const categoryCards = [
    { name: 'Medicines', settingsKey: 'category_med_image' },
    { name: 'Groceries', settingsKey: 'category_groceries_image' },
    { name: 'Home Needs', settingsKey: 'category_home_image' },
    { name: 'Office Needs', settingsKey: 'category_office_image' },
    { name: 'Construction', settingsKey: 'category_construction_image', badge: 'BULK', wide: true },
  ];

  const categoryImageUrl = (card) => {
    const category = categories.find(c => c.name.toLowerCase() === card.name.toLowerCase());
    return category?.image_url || settings[card.settingsKey] || '';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
        <div
          className={`absolute inset-0 bg-bottom ${settings.home_hero_image ? 'bg-cover' : ''}`}
          style={settings.home_hero_image ? { backgroundImage: `url('${settings.home_hero_image}')` } : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-container-max mx-auto px-4 md:px-margin flex items-center">
          <div className="max-w-xl space-y-stack-lg p-4 md:p-0">
            <h1 className="font-headline-display text-headline-display text-primary">
              EVERYTHING YOU NEED,<br/>
              <span className="text-secondary-fixed-dim italic">We Deliver!</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              4Brothers is your trusted partner for all kinds of products and supplies. We serve homes, businesses, industries and special events with reliability, speed and care.
            </p>
            <div className="flex flex-wrap gap-stack-md mt-4">
              <button className="font-label-bold text-label-bold text-on-primary bg-primary-container px-8 py-3 rounded industrial-shadow hover:brightness-110 transition-all uppercase tracking-widest">Order Now</button>
              <button className="md:hidden font-label-bold text-label-bold text-secondary-fixed-dim border-2 border-secondary-fixed-dim px-8 py-3 rounded hover:bg-surface-variant/10 transition-colors uppercase tracking-widest">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section className="bg-surface-container-low text-on-surface-variant py-3 md:py-stack-md px-4 md:px-margin border-b md:border-y border-outline/30 md:border-outline-variant">
        <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-between items-center gap-2 md:gap-stack-lg divide-x md:divide-none divide-outline/30 text-center max-w-container-max mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-stack-sm px-1 md:px-0">
            <span className="material-symbols-outlined text-secondary-fixed md:text-secondary mb-1 md:mb-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <span className="font-label-bold text-[10px] md:text-label-bold leading-tight md:leading-normal">TRUSTED<span className="md:hidden"><br/></span><span className="hidden md:inline"> </span>SERVICE</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-stack-sm px-1 md:px-0">
            <span className="material-symbols-outlined text-secondary-fixed md:text-secondary mb-1 md:mb-0" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <span className="hidden md:block font-label-bold text-label-bold">QUALITY PRODUCTS</span>
            {/* Mobile shows "Fast & Safe Delivery" in 2nd column instead of Quality Products based on the reference */}
            <span className="md:hidden font-label-bold text-[10px] leading-tight">FAST & SAFE<br/>DELIVERY</span>
          </div>

          <div className="hidden md:flex items-center gap-stack-sm text-primary-container">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
            <span className="font-label-bold text-label-bold">FAST & SAFE DELIVERY</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-stack-sm px-1 md:px-0">
            <span className="material-symbols-outlined text-secondary-fixed md:text-secondary mb-1 md:mb-0" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
            <span className="font-label-bold text-[10px] md:text-label-bold leading-tight md:leading-normal">24/7 CUSTOMER<span className="md:hidden"><br/></span><span className="hidden md:inline"> </span>SUPPORT</span>
          </div>

        </div>
      </section>

      {/* Product Categories */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin py-4 md:py-12 bg-surface flex flex-col gap-4 md:gap-0">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-primary">Our Supplies</h2>
          <button className="text-secondary font-label-bold text-label-bold hover:underline">VIEW ALL</button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-8">
          <h2 className="font-headline-lg text-headline-lg text-primary-container mb-2 uppercase tracking-tight">We Deliver All Types Of Products</h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-stack-md">
          {categoryCards.map((card) => {
            const isConstruction = card.name === 'Construction';
            const imageUrl = categoryImageUrl(card);
            return (
              <Link
                key={card.name}
                to={getCatId(card.name)}
                className={`group bg-surface-container-lowest md:industrial-card border-2 md:border md:border-t-2 md:hover:border-secondary border-secondary rounded md:rounded-lg flex flex-col industrial-shadow md:hover:industrial-shadow transition-all overflow-hidden relative ${isConstruction ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <div className="md:hidden absolute top-2 right-2 z-20 bg-secondary text-on-secondary rounded-full p-1 shadow-md"><span className="material-symbols-outlined text-[14px] block">check</span></div>
                {isConstruction && <div className="hidden md:block absolute top-2 right-2 bg-secondary text-on-secondary-fixed font-label-bold text-[10px] px-2 py-1 rounded">BULK</div>}
                <div className={`h-24 md:h-48 bg-surface-variant flex items-center justify-center relative overflow-hidden`}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={card.name}
                      className="object-cover w-full h-full mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-300 md:duration-500 md:mix-blend-normal md:opacity-100"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : null}
                </div>
                <div className="p-3 md:p-4 border-t border-[#072a1f]/5 md:border-outline-variant flex md:block items-center justify-between bg-surface-container-lowest z-10 text-center">
                  <h3 className="font-label-md text-label-md text-secondary md:text-primary-container md:uppercase md:tracking-wider transition-colors">{card.name}</h3>
                  <span className="md:hidden material-symbols-outlined text-[16px] text-secondary">arrow_forward</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Track Your Supply Chain Feature */}
      <section className="bg-surface-container-low md:bg-surface-container border-t md:border-y border-outline-variant/50 md:border-outline-variant p-4 md:py-12 flex flex-col gap-3">
        <div className="max-w-container-max mx-auto md:px-margin w-full">
          
          {/* Mobile version */}
          <div className="md:hidden bg-surface-container-lowest border border-[#072a1f]/10 rounded p-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl"></div>
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-label-md text-label-md text-primary mb-1">Track Your Supply Chain</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-3 leading-snug">
                  Enter your logistics ID to monitor your heavy fleet or daily delivery status in real-time.
                </p>
                <div className="flex gap-2">
                  <input className="w-full bg-surface-bright border border-outline/30 rounded px-3 py-2 font-body-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-primary" placeholder="Enter Order ID" type="text" />
                  <button className="bg-primary-container text-on-tertiary px-3 py-2 rounded flex items-center justify-center hover:bg-primary-container/90 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Version */}
          <div className="hidden md:grid lg:grid-cols-2 gap-margin items-center">
            <div className="space-y-stack-md">
              <h2 className="font-headline-lg text-headline-lg text-primary-container">Track Your Supply Chain</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Monitor your bulk orders and industrial supplies in real-time. Our precision logistics ensure you always know where your materials are.
              </p>
              <div className="industrial-card rounded-lg p-6 space-y-4 industrial-focus mt-4">
                <label className="font-label-bold text-label-bold text-primary-container block">ENTER TRACKING ID</label>
                <div className="flex gap-2">
                  <input className="flex-grow rounded border border-outline px-4 py-2 font-body-md bg-surface-container-lowest focus:ring-0 focus:outline-none focus:border-transparent" placeholder="e.g. FB-8492-IND" type="text" />
                  <button className="bg-primary-container text-on-primary px-6 py-2 rounded font-label-bold text-label-bold hover:brightness-110 transition-colors uppercase">Track</button>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 rounded-xl bg-primary-fixed text-on-primary-fixed-variant font-label-bold text-label-bold text-[10px] uppercase">Active Fleet: 42</span>
                <span className="px-3 py-1 rounded-xl bg-secondary-container text-on-secondary-fixed-variant font-label-bold text-label-bold text-[10px] uppercase">In Transit: 18</span>
              </div>
            </div>
            
            {/* Map Visualization Placeholder */}
            <div className="h-[400px] industrial-card rounded-lg overflow-hidden border-2 border-primary-container relative">
              <div className="w-full h-full bg-surface-container-low rounded-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent flex items-end p-6">
                <div className="bg-surface-container-lowest/90 backdrop-blur p-4 rounded border border-outline-variant w-full flex justify-between items-center shadow-lg">
                  <div>
                    <div className="font-label-bold text-label-bold text-on-surface-variant uppercase mb-1">Live Status</div>
                    <div className="font-headline-sm text-headline-sm font-bold text-primary-container text-xl">Fleet Operational</div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-3xl">radar</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </>
  );
};

export default Home;
