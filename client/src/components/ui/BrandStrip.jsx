import React from 'react';

const BrandStrip = () => {
  const brands = [
    'DeWALT', 'BOSCH', 'Makita', 'STANLEY', 'Milwaukee', 'RIDGID', 'HILTI', '3M'
  ];

  return (
    <div className="bg-black py-12 border-t-4 border-safety-yellow">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gray-800 flex-grow max-w-xs"></div>
          <h2 className="font-heading font-bold text-2xl text-white px-6 tracking-widest uppercase">Global Brands We Supply</h2>
          <div className="h-px bg-gray-800 flex-grow max-w-xs"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div key={brand} className="rounded-lg border border-gray-700 bg-white/5 py-4 text-sm font-semibold uppercase tracking-widest text-white">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStrip;
