import React, { useState } from 'react';
import { X, MessageCircle, Ruler, Shield, Sparkles, Box, CheckCircle2, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/whatsapp';
import { getCategorySvg } from '../utils/placeholders';

export default function ProductModal({ product, onClose }) {
  const [pincode, setPincode] = useState('');
  const [customDimensions, setCustomDimensions] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [imageError, setImageError] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!product) return null;

  // Resolve images with Vite BASE_URL for GitHub Pages support
  const images = (product.images && product.images.length > 0)
    ? product.images
    : (product.image ? [product.image] : []);

  const getImgUrl = (path) => {
    if (!path) return null;
    if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    const clean = String(path).replace(/^\/?(images\/products\/)?/, '');
    return `${import.meta.env.BASE_URL}images/products/${clean}`;
  };

  const currentImg = images[activeImgIdx] || product.image;
  const currentImgUrl = currentImg && !imageError
    ? getImgUrl(currentImg)
    : getCategorySvg(product.category, product.title);

  const waUrl = generateWhatsAppUrl(product, {
    pincode,
    customDimensions,
    customColor
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="bg-[#15171b] border border-gold-500/30 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Multi-Photo Gallery & Badges */}
          <div className="flex flex-col bg-[#141619] border-b md:border-b-0 md:border-r border-slate-800">
            <div className="relative aspect-[4/3] md:aspect-square bg-[#1a1d22] flex items-center justify-center overflow-hidden">
              <img
                src={currentImgUrl}
                alt={`${product.title} - Photo ${activeImgIdx + 1}`}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Photo Counter Pill */}
              {images.length > 1 && (
                <span className="absolute top-4 right-14 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/75 backdrop-blur-md text-white border border-slate-700">
                  {activeImgIdx + 1} / {images.length} Photos
                </span>
              )}

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm border border-slate-700/80 transition"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm border border-slate-700/80 transition"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="p-3 bg-[#111316] border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      activeImgIdx === idx ? 'border-gold-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={getImgUrl(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Trust bar */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>5-Year Finish Warranty</span>
              </span>
              <span className="flex items-center space-x-1 text-slate-400">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Pan-India Crated</span>
              </span>
            </div>
          </div>

          {/* Right Column: Full Specifications & Order Form */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & ID */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="text-gold-400 font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="font-mono text-slate-500">ID: {product.id}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {product.title}
              </h2>

              {/* Pricing Notice Box */}
              <div className="mt-4 p-4 rounded-2xl bg-[#1c1f24] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-gold-400 block">
                    Factory Price Rate on Request
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    Direct workshop quote based on your selected size &amp; finish
                  </span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold whitespace-nowrap">
                  Factory Direct
                </span>
              </div>

              {/* Product Description & Craftsmanship Details */}
              {product.description && (
                <div className="mt-5 p-4 rounded-2xl bg-[#111316] border border-slate-800/90 text-xs text-slate-300">
                  <span className="text-[11px] font-semibold text-gold-400/90 uppercase tracking-wider block mb-2">
                    Craftsmanship &amp; Details:
                  </span>
                  <div className="whitespace-pre-line leading-relaxed font-sans text-slate-300">
                    {product.description}
                  </div>
                </div>
              )}

              {/* Specifications Matrix */}
              <div className="mt-5 space-y-2.5 text-xs">
                <div className="flex items-start justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Ruler className="w-3.5 h-3.5 text-gold-400" />
                    <span>Dimensions:</span>
                  </span>
                  <span className="text-white font-medium text-right">{product.size} (Customizable)</span>
                </div>

                <div className="flex items-start justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Box className="w-3.5 h-3.5 text-amber-400" />
                    <span>Material:</span>
                  </span>
                  <span className="text-white font-medium text-right max-w-[60%]">{product.material}</span>
                </div>

                <div className="flex items-start justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>PU Polish / Finish:</span>
                  </span>
                  <span className="text-white font-medium text-right max-w-[60%]">{product.finish}</span>
                </div>
              </div>

              {/* Highlights */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom Order / WhatsApp Inquiry Inputs */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-gold-400 block">
                  Check Delivery &amp; Get Price Quote:
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Your Pincode (e.g. 110001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="bg-[#1c1f24] border border-slate-700/80 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  />
                  <input
                    type="text"
                    placeholder="Custom Size (e.g. 6x3 ft)"
                    value={customDimensions}
                    onChange={(e) => setCustomDimensions(e.target.value)}
                    className="bg-[#1c1f24] border border-slate-700/80 rounded-xl px-3 py-2 text-white outline-none focus:border-gold-500"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Custom Color / Finish Notes (e.g. Emerald Green PU)"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full bg-[#1c1f24] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition flex items-center justify-center space-x-2 shadow-xl shadow-green-900/30"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Get Factory Rate Quote on WhatsApp</span>
              </a>

              <p className="text-center text-[11px] text-slate-500 mt-2">
                Replies typically within 1 hour • Workshop visits by appointment in Delhi
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
