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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stoneWarm-200 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-gold-700 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Direct Manufacturer Catalog</span>
            <span>•</span>
            <span>{products.length} Verified Unique Designs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stoneWarm-900 font-display tracking-tight">
            Explore Factory Finish Collections
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stoneWarm-500" />
          <input
            type="text"
            placeholder="Search fluted, LED, marble, glass..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stoneWarm-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-stoneWarm-900 placeholder-stoneWarm-400 outline-none transition shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stoneWarm-400 hover:text-stoneWarm-800"
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
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-stoneWarm-900 text-white shadow-xs'
                  : 'bg-white text-stoneWarm-700 hover:text-stoneWarm-950 hover:bg-stoneWarm-100 border border-stoneWarm-300'
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
            className="bg-white border border-stoneWarm-300 text-xs text-stoneWarm-800 font-medium rounded-xl px-3 py-2 outline-none focus:border-gold-500 cursor-pointer shadow-xs"
          >
            <option value="FEATURED">Featured Designs</option>
            <option value="NAME_ASC">Name: A to Z</option>
            <option value="NAME_DESC">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Active Filter Counter */}
      <div className="text-xs text-stoneWarm-600 mb-6 flex items-center justify-between">
        <span>
          Showing <strong className="text-stoneWarm-900 font-bold">{filteredProducts.length}</strong> designs
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(searchQuery || activeCategory !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('All');
            }}
            className="text-gold-700 font-semibold hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white border border-stoneWarm-200 rounded-2xl p-8 max-w-lg mx-auto shadow-warm-card">
          <div className="w-12 h-12 rounded-full bg-stoneWarm-100 flex items-center justify-center mx-auto mb-4 text-stoneWarm-600">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-stoneWarm-900 font-bold text-lg mb-2">No matching furniture pieces</h3>
          <p className="text-stoneWarm-600 text-xs mb-6 leading-relaxed">
            We couldn't find anything matching your search. Inquire directly on WhatsApp to get custom pricing for your design!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('All');
            }}
            className="px-5 py-2.5 rounded-xl bg-stoneWarm-900 hover:bg-stoneWarm-800 text-white font-bold text-xs shadow-sm"
          >
            Show All {products.length} Designs
          </button>
        </div>
      )}
    </section>
  );
}
