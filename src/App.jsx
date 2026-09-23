import React, { useState, useEffect } from 'react';
import initialProducts from './data/products.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CustomBanner from './components/CustomBanner';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import AdminImporter from './components/AdminImporter';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load custom products saved locally if any
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fff_custom_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts([...parsed, ...initialProducts]);
        }
      }
    } catch (e) {
      console.warn('Failed to load local custom products', e);
    }
  }, []);

  const handleAddProductToCatalog = (newProduct) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      const existingCustom = JSON.parse(localStorage.getItem('fff_custom_products') || '[]');
      localStorage.setItem('fff_custom_products', JSON.stringify([newProduct, ...existingCustom]));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };

  const handleExploreClick = () => {
    const section = document.getElementById('catalog-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1114] flex flex-col justify-between selection:bg-gold-500 selection:text-charcoal-950">
      
      {/* Navigation Header */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleExploreClick();
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero onExploreClick={handleExploreClick} productCount={products.length} />

        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectProduct={setSelectedProduct}
        />

        <CustomBanner />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Deep-Dive Product Details Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Admin: Paste & Parse Listing Importer */}
      <AdminImporter
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onAddProductToCatalog={handleAddProductToCatalog}
        allProducts={products}
      />

    </div>
  );
}
