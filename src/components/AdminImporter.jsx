import React, { useState } from 'react';
import { X, Sparkles, Copy, Download, Check, RefreshCw, Eye } from 'lucide-react';
import { parseMarketplaceText } from '../utils/parser';
import ProductCard from './ProductCard';

export default function AdminImporter({ isOpen, onClose, onAddProductToCatalog, allProducts }) {
  const [inputText, setInputText] = useState('');
  const [parsedProduct, setParsedProduct] = useState(null);
  const [copied, setCopied] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);

  if (!isOpen) return null;

  const handleParse = () => {
    const result = parseMarketplaceText(inputText);
    if (result) {
      setParsedProduct(result);
    }
  };

  const handleFieldChange = (field, value) => {
    setParsedProduct(prev => ({
      ...prev,
      [field]: field === 'price' || field === 'originalPrice' ? Number(value) : value
    }));
  };

  const handleCopyJson = () => {
    if (!parsedProduct) return;
    navigator.clipboard.writeText(JSON.stringify(parsedProduct, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFullCatalog = () => {
    if (!parsedProduct) return;
    const updated = [parsedProduct, ...allProducts];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(updated, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "products.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSaveToBrowser = () => {
    if (!parsedProduct) return;
    onAddProductToCatalog(parsedProduct);
    setSavedLocally(true);
    setTimeout(() => {
      setSavedLocally(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#15171b] border border-gold-500/30 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">
                Facebook Marketplace "Paste &amp; Parse" Tool
              </h3>
              <p className="text-slate-400 text-xs">
                Paste listing text from Facebook to auto-extract fields and add to catalog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Box */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Paste Facebook Marketplace Listing Details:
          </label>
          <textarea
            rows="5"
            placeholder="Paste your listing text here, e.g.:&#10;Premium Modern Fluted Sideboard & Glass Showcase | Factory Rate&#10;₹22,500&#10;Size: 5 × 3 Feet&#10;Material: Premium Quality MDF Board with Toughened Tinted Glass&#10;Finish: High-Quality PU Polish..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-[#1c1f24] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-gold-500 font-mono"
          />
          <button
            onClick={handleParse}
            disabled={!inputText.trim()}
            className="mt-3 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-charcoal-950 font-bold text-xs flex items-center space-x-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Auto-Parse Listing</span>
          </button>
        </div>

        {/* Parsed Result & Form */}
        {parsedProduct && (
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-white font-bold text-sm mb-4 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gold-400" />
              <span>Parsed Product Data (Verify or Edit):</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={parsedProduct.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={parsedProduct.category}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-gold-500"
                >
                  <option value="Sideboards & Consoles">Sideboards & Consoles</option>
                  <option value="Display & Bar Cabinets">Display & Bar Cabinets</option>
                  <option value="LED Dressing Tables">LED Dressing Tables</option>
                  <option value="Fluted Wardrobes">Fluted Wardrobes</option>
                  <option value="Pooja Mandirs">Pooja Mandirs</option>
                  <option value="Storage Cabinets">Storage Cabinets</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Factory Price (₹)</label>
                <input
                  type="number"
                  value={parsedProduct.price}
                  onChange={(e) => handleFieldChange('price', e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-gold-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Estimated Retail MRP (₹)</label>
                <input
                  type="number"
                  value={parsedProduct.originalPrice}
                  onChange={(e) => handleFieldChange('originalPrice', e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-gold-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Dimensions / Size</label>
                <input
                  type="text"
                  value={parsedProduct.size}
                  onChange={(e) => handleFieldChange('size', e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Image Filename in Repo (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. fluted-sideboard-showcase.jpg"
                  value={parsedProduct.image}
                  onChange={(e) => handleFieldChange('image', e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-gold-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-400 block mb-1">Material Details</label>
                <input
                  type="text"
                  value={parsedProduct.material}
                  onChange={(e) => handleFieldChange('material', e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Export Actions */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={handleCopyJson}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs flex items-center space-x-2 border border-slate-700 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gold-400" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON Snippet'}</span>
              </button>

              <button
                onClick={handleDownloadFullCatalog}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs flex items-center space-x-2 border border-slate-700 transition"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Updated products.json</span>
              </button>

              <button
                onClick={handleSaveToBrowser}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-900/40 transition"
              >
                {savedLocally ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                <span>{savedLocally ? 'Added to Live Store!' : 'Add to Current Live Catalog'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
