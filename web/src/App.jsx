import React, { useState, useEffect } from 'react';
import initialProducts from './data/products.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CustomBanner from './components/CustomBanner';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import AdminImporter from './components/AdminImporter';
import BlogSection from './components/BlogSection';
import { fetchSanityProducts, fetchSiteSettings, fetchBlogPosts } from './utils/sanity';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [siteSettings, setSiteSettings] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load products, siteSettings, and blog posts from Sanity with seamless local fallback
  useEffect(() => {
    let isMounted = true;

    // 1. Fetch products
    fetchSanityProducts().then((sanityProducts) => {
      if (isMounted && sanityProducts && sanityProducts.length > 0) {
        setProducts(sanityProducts);
      }
    });

    // 2. Fetch site settings & brand configuration
    fetchSiteSettings().then((settings) => {
      if (isMounted && settings) {
        setSiteSettings(settings);
      }
    });

    // 3. Fetch design guides / blog posts
    fetchBlogPosts().then((posts) => {
      if (isMounted && posts && posts.length > 0) {
        setBlogPosts(posts);
      }
    });

    // Also support local testing additions
    try {
      const saved = localStorage.getItem('fff_custom_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts((current) => [...parsed, ...current]);
        }
      }
    } catch (e) {
      console.warn('Failed to load local custom products', e);
    }

    // Hidden shortcut for workshop admin (Ctrl+Shift+A or ?admin=true)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (new URLSearchParams(window.location.search).get('admin') === 'true') {
      setIsAdminOpen(true);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
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
    <div className="min-h-screen bg-stoneWarm-50 text-stoneWarm-900 flex flex-col justify-between selection:bg-gold-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeCategory={activeCategory}
        siteSettings={siteSettings}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleExploreClick();
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onExploreClick={handleExploreClick}
          productCount={products.length}
          siteSettings={siteSettings}
        />

        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectProduct={setSelectedProduct}
        />

        <BlogSection blogPosts={blogPosts} />

        <CustomBanner />
      </main>

      {/* Footer */}
      <Footer
        siteSettings={siteSettings}
        blogPosts={blogPosts}
      />

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
