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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stoneWarm-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="bg-white border border-stoneWarm-200 rounded-3xl max-w-4xl w-full overflow-hidden shadow-warm-modal relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-stoneWarm-100 text-stoneWarm-700 hover:text-stoneWarm-900 border border-stoneWarm-200 shadow-sm flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Multi-Photo Gallery & Badges */}
          <div className="flex flex-col bg-stoneWarm-50 border-b md:border-b-0 md:border-r border-stoneWarm-200">
            <div className="relative aspect-[4/3] md:aspect-square bg-stoneWarm-100 flex items-center justify-center overflow-hidden">
              <img
                src={currentImgUrl}
                alt={`${product.title} - Photo ${activeImgIdx + 1}`}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Photo Counter Pill */}
              {images.length > 1 && (
                <span className="absolute top-4 right-14 px-2.5 py-1 rounded-full text-xs font-semibold bg-stoneWarm-900/80 backdrop-blur-xs text-white border border-stoneWarm-700 shadow-sm">
                  {activeImgIdx + 1} / {images.length} Photos
                </span>
              )}

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stoneWarm-800 flex items-center justify-center backdrop-blur-xs border border-stoneWarm-200 shadow-sm transition"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stoneWarm-800 flex items-center justify-center backdrop-blur-xs border border-stoneWarm-200 shadow-sm transition"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-white shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="p-3 bg-white border-t border-stoneWarm-200 flex items-center space-x-2 overflow-x-auto scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      activeImgIdx === idx ? 'border-gold-500 scale-105 shadow-xs' : 'border-stoneWarm-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={getImgUrl(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Trust bar */}
            <div className="p-3.5 bg-stoneWarm-100 border-t border-stoneWarm-200 flex items-center justify-between text-xs text-stoneWarm-700">
              <span className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>5-Year Finish Warranty</span>
              </span>
              <span className="flex items-center space-x-1 text-stoneWarm-600 font-medium">
                <Truck className="w-4 h-4 text-sky-700" />
                <span>Pan-India Crated</span>
              </span>
            </div>
          </div>

          {/* Right Column: Full Specifications & Order Form */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & ID */}
              <div className="flex items-center justify-between text-xs text-stoneWarm-500 mb-1">
                <span className="text-gold-700 font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="font-mono text-stoneWarm-500">ID: {product.id}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-stoneWarm-900 leading-snug">
                {product.title}
              </h2>

              {/* Pricing Notice Box */}
              <div className="mt-4 p-4 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-gold-900 block">
                    Factory Price Rate on Request
                  </span>
                  <span className="text-xs text-gold-800 mt-0.5 block">
                    Direct workshop quote based on your selected size &amp; finish
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold whitespace-nowrap">
                  Factory Direct
                </span>
              </div>

              {/* Product Description & Craftsmanship Details */}
              {product.description && (
                <div className="mt-5 p-4 rounded-2xl bg-stoneWarm-50 border border-stoneWarm-200 text-xs">
                  <span className="text-xs font-bold text-stoneWarm-900 uppercase tracking-wider block mb-1.5">
                    Craftsmanship &amp; Details:
                  </span>
                  <div className="whitespace-pre-line leading-relaxed font-sans text-stoneWarm-700">
                    {product.description}
                  </div>
                </div>
              )}

              {/* Specifications Matrix */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="flex items-start justify-between py-2 border-b border-stoneWarm-200">
                  <span className="text-stoneWarm-600 flex items-center space-x-1.5 font-medium">
                    <Ruler className="w-3.5 h-3.5 text-gold-700" />
                    <span>Dimensions:</span>
                  </span>
                  <span className="text-stoneWarm-900 font-semibold text-right">{product.size} (Customizable)</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-stoneWarm-200">
                  <span className="text-stoneWarm-600 flex items-center space-x-1.5 font-medium">
                    <Box className="w-3.5 h-3.5 text-amber-700" />
                    <span>Material:</span>
                  </span>
                  <span className="text-stoneWarm-900 font-semibold text-right max-w-[60%]">{product.material}</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-stoneWarm-200">
                  <span className="text-stoneWarm-600 flex items-center space-x-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-gold-700" />
                    <span>PU Polish / Finish:</span>
                  </span>
                  <span className="text-stoneWarm-900 font-semibold text-right max-w-[60%]">{product.finish}</span>
                </div>
              </div>

              {/* Highlights */}
              {product.features && product.features.length > 0 && (
                <div className="mt-5">
                  <span className="text-xs font-bold text-stoneWarm-900 uppercase tracking-wider block mb-2">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stoneWarm-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom Order / WhatsApp Inquiry Inputs */}
              <div className="mt-6 pt-4 border-t border-stoneWarm-200 space-y-3">
                <span className="text-xs font-bold text-stoneWarm-900 block">
                  Check Delivery &amp; Get Price Quote:
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Your Pincode (e.g. 110001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="bg-white border border-stoneWarm-300 rounded-xl px-3.5 py-2.5 text-stoneWarm-900 placeholder-stoneWarm-400 outline-none focus:border-gold-500 shadow-xs"
                  />
                  <input
                    type="text"
                    placeholder="Custom Size (e.g. 6x3 ft)"
                    value={customDimensions}
                    onChange={(e) => setCustomDimensions(e.target.value)}
                    className="bg-white border border-stoneWarm-300 rounded-xl px-3.5 py-2.5 text-stoneWarm-900 placeholder-stoneWarm-400 outline-none focus:border-gold-500 shadow-xs"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Custom Color / Finish Notes (e.g. Emerald Green PU)"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full bg-white border border-stoneWarm-300 rounded-xl px-3.5 py-2.5 text-xs text-stoneWarm-900 placeholder-stoneWarm-400 outline-none focus:border-gold-500 shadow-xs"
                />
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="mt-6 pt-4 border-t border-stoneWarm-200 space-y-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/15"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Get Factory Rate Quote on WhatsApp</span>
              </a>

              <p className="text-center text-xs text-stoneWarm-500 mt-2 font-normal">
                Replies typically within 1 hour • Workshop visits by appointment in Delhi
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
