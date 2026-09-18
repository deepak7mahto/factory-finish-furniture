import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, activeCategory, onSelectCategory, onSelectProduct }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('FEATURED');

  const categories = [
    'All',
    'Sideboards & Consoles',
    'Display & Bar Cabinets',
    'LED Dressing Tables',
    'Fluted Wardrobes',
    'Pooja Mandirs',
    'Storage Cabinets'
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (activeCategory !== 'All' && product.category !== activeCategory) {
          return false;
        }

        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchMaterial = product.material.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchFeatures = product.features && product.features.some(f => f.toLowerCase().includes(q));
          if (!matchTitle && !matchMaterial && !matchCategory && !matchFeatures) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'NAME_ASC') return a.title.localeCompare(b.title);
        if (sortBy === 'NAME_DESC') return b.title.localeCompare(a.title);
        return 0; // Featured default order
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Direct Manufacturer Catalog</span>
            <span>•</span>
            <span>{products.length} Verified Unique Designs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Explore Factory Finish Collections
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search fluted, LED, marble, glass..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16181c] border border-slate-700/80 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-gold-500 text-charcoal-950 font-bold shadow-sm'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#16181c] border border-slate-700/80 text-xs text-slate-200 rounded-xl px-3 py-2 outline-none focus:border-gold-500 cursor-pointer"
          >
            <option value="FEATURED">Featured Designs</option>
            <option value="NAME_ASC">Name: A to Z</option>
            <option value="NAME_DESC">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Active Filter Counter */}
      <div className="text-xs text-slate-400 mb-6 flex items-center justify-between">
        <span>
          Showing <strong className="text-white">{filteredProducts.length}</strong> designs
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(searchQuery || activeCategory !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('All');
            }}
            className="text-gold-400 hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-[#141619] border border-slate-800 rounded-2xl p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No matching furniture pieces</h3>
          <p className="text-slate-400 text-xs mb-6">
            We couldn't find anything matching your search. Inquire directly on WhatsApp to get custom pricing for your design!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('All');
            }}
            className="px-5 py-2.5 rounded-xl bg-gold-500 text-charcoal-950 font-bold text-xs"
          >
            Show All {products.length} Designs
          </button>
        </div>
      )}
    </section>
  );
}
