import React, { useState } from 'react';
import { MessageCircle, Eye, Shield, Ruler, Sparkles } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/whatsapp';
import { getCategorySvg } from '../utils/placeholders';

export default function ProductCard({ product, onSelect }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // If local image exists in public/images/products/, try loading it, else fallback to SVG
  const imageSource = product.image && !imageError
    ? `./images/products/${product.image}`
    : getCategorySvg(product.category, product.title);

  const savings = product.originalPrice && product.price
    ? product.originalPrice - product.price
    : 0;

  return (
    <div className="group bg-[#15171b] border border-slate-800/90 rounded-2xl overflow-hidden hover:border-gold-500/40 hover:shadow-2xl hover:shadow-gold-500/5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badge */}
        <div className="relative aspect-[16/10] bg-[#1a1d22] overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
          <img
            src={imageSource}
            alt={product.title}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-gold-600 to-gold-500 text-charcoal-950 shadow-md">
                {product.badge}
              </span>
            )}
            {product.isCustomizable && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 text-slate-200">
                Custom Size
              </span>
            )}
          </div>

          {/* Direct Savings Badge */}
          {savings > 0 && (
            <div className="absolute top-3 right-3 bg-emerald-500/90 text-charcoal-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              SAVE ₹{savings.toLocaleString('en-IN')}
            </div>
          )}

          {/* Quick view overlay hint */}
          <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-medium border border-gold-500/30">
              <Eye className="w-3.5 h-3.5 text-gold-400" />
              <span>View Full Specs</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Category */}
          <span className="text-[11px] font-semibold tracking-wider uppercase text-gold-400/90">
            {product.category}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="text-white font-semibold text-base mt-1 line-clamp-2 hover:text-gold-300 transition-colors cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Spec Badges (Size, Material snippet) */}
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              <Ruler className="w-3 h-3 text-gold-400" />
              <span>{product.size}</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>PU Polish</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>5-Yr Warranty</span>
            </span>
          </div>

          {/* Price Box */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-white tracking-tight">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">
                Factory Price Rate
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Delhi Direct</span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => onSelect(product)}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition text-center flex items-center justify-center space-x-1"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <a
          href={generateWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md shadow-green-950/40"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent" />
          <span>Order</span>
        </a>
      </div>
    </div>
  );
}
