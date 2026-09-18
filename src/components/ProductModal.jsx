import React, { useState } from 'react';
import { X, MessageCircle, Ruler, Shield, Sparkles, Box, CheckCircle2, Truck, Share2 } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/whatsapp';
import { getCategorySvg } from '../utils/placeholders';

export default function ProductModal({ product, onClose }) {
  const [pincode, setPincode] = useState('');
  const [customDimensions, setCustomDimensions] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [notes, setNotes] = useState('');
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const imageSource = product.image && !imageError
    ? `./images/products/${product.image}`
    : getCategorySvg(product.category, product.title);

  const savings = product.originalPrice && product.price
    ? product.originalPrice - product.price
    : 0;

  const waUrl = generateWhatsAppUrl(product, {
    pincode,
    customDimensions,
    customColor,
    notes
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
          
          {/* Left Column: Image & Badges */}
          <div className="relative bg-[#1a1d22] aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
            <img
              src={imageSource}
              alt={product.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 shadow-lg">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
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

              {/* Pricing Callout */}
              <div className="mt-4 p-4 rounded-2xl bg-[#1c1f24] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Factory Direct Rate</span>
                  <div className="flex items-baseline space-x-2.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
                {savings > 0 && (
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold block">
                      SAVE ₹{savings.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">vs. Showroom MRP</span>
                  </div>
                )}
              </div>

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
                    <span>Finish:</span>
                  </span>
                  <span className="text-white font-medium text-right max-w-[60%]">{product.finish}</span>
                </div>

                {product.color && (
                  <div className="flex items-start justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Color / Accent:</span>
                    <span className="text-white font-medium text-right">{product.color}</span>
                  </div>
                )}

                {product.storage && (
                  <div className="flex items-start justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Storage Config:</span>
                    <span className="text-white font-medium text-right max-w-[60%]">{product.storage}</span>
                  </div>
                )}

                {product.hardware && (
                  <div className="flex items-start justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Hardware:</span>
                    <span className="text-white font-medium text-right max-w-[60%]">{product.hardware}</span>
                  </div>
                )}
              </div>

              {/* Key Features Bullet List */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                    Highlights:
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
                  Customize &amp; Check Pincode Delivery:
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

            {/* Modal Bottom CTA */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition flex items-center justify-center space-x-2 shadow-xl shadow-green-900/30"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Inquire &amp; Order on WhatsApp</span>
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
