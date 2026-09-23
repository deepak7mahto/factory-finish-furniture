import React, { useState } from 'react';
import { MessageCircle, Eye, Shield, Ruler, Sparkles } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/whatsapp';
import { getCategorySvg } from '../utils/placeholders';

export default function ProductCard({ product, onSelect, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Resolve image: supports full CDN URLs (Sanity) or local relative assets
  const resolveImageSource = (img) => {
    if (!img) return null;
    if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://'))) {
      return img;
    }
    const clean = String(img).replace(/^\/?(images\/products\/)?/, '');
    return `${import.meta.env.BASE_URL}images/products/${clean}`;
  };

  const imageSource = product.image && !imageError
    ? resolveImageSource(product.image)
    : getCategorySvg(product.category, product.title);

  const photoCount = product.images ? product.images.length : (product.image ? 1 : 0);
  const isAboveFold = index < 2;

  return (
    <article className="group bg-white border border-stoneWarm-200 rounded-2xl overflow-hidden hover:border-gold-400 hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-between shadow-warm-card">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] bg-stoneWarm-100 overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
          <img
            src={imageSource}
            alt={`${product.title} - Handcrafted Luxury Furniture Delhi`}
            loading={isAboveFold ? undefined : 'lazy'}
            fetchPriority={isAboveFold ? 'high' : undefined}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Floating Badges (Top-Left) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gold-500 text-white shadow-sm">
                {product.badge}
              </span>
            )}
            {product.isCustomizable && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-stoneWarm-800 border border-stoneWarm-200 shadow-sm backdrop-blur-xs">
                Custom Size
              </span>
            )}
          </div>

          {/* Value Callout Badge (Top-Right) */}
          <div className="absolute top-3 right-3 bg-stoneWarm-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wide">
            Factory Direct
          </div>

          {/* Photo Count Badge (Bottom-Right) */}
          {photoCount > 1 && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-stoneWarm-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-stoneWarm-200 flex items-center space-x-1.5 z-10 shadow-sm">
              <span>📸</span>
              <span>{photoCount} Photos</span>
            </div>
          )}

          {/* Quick view overlay hint */}
          <div className="absolute inset-0 bg-stoneWarm-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-stoneWarm-900 text-xs font-semibold border border-stoneWarm-200 shadow-lg">
              <Eye className="w-3.5 h-3.5 text-gold-600" />
              <span>View Full Gallery &amp; Specs</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs font-bold tracking-wider uppercase text-gold-700">
            {product.category}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="text-stoneWarm-900 font-semibold text-base mt-1 line-clamp-2 hover:text-gold-700 transition-colors cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Spec Badges (Size, Material snippet) */}
          <div className="mt-3.5 flex flex-wrap gap-2 text-xs text-stoneWarm-800">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-stoneWarm-100 border border-stoneWarm-200 font-medium">
              <Ruler className="w-3.5 h-3.5 text-gold-700" />
              <span>{product.size}</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-stoneWarm-100 border border-stoneWarm-200 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>PU Polish</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-stoneWarm-100 border border-stoneWarm-200 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-700" />
              <span>5-Yr Warranty</span>
            </span>
          </div>

          {/* Rate Notice Box (No numeric price) */}
          <div className="mt-4 pt-3.5 border-t border-stoneWarm-200 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-stoneWarm-900 tracking-wide block">
                Factory Rate on Request
              </span>
              <span className="text-xs text-stoneWarm-600 font-normal">
                Delhi Manufacturer Rate • Custom Sizing
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              Pan-India
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onSelect(product)}
          className="w-full py-2.5 px-3 rounded-xl bg-stoneWarm-100 hover:bg-stoneWarm-200 text-stoneWarm-800 border border-stoneWarm-200 text-xs font-semibold transition text-center flex items-center justify-center space-x-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Details ({photoCount})</span>
        </button>

        <a
          href={generateWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-900/15"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent" />
          <span>Get Price</span>
        </a>
      </div>
    </article>
  );
}
