import React from 'react';
import { Sparkles, MessageCircle, Ruler, Palette, Hammer } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function CustomBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative rounded-3xl overflow-hidden bg-stoneWarm-900 border border-stoneWarm-800 p-8 sm:p-12 shadow-warm-modal text-white">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interior Designers &amp; Homeowners</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-snug">
              Have Specific Dimensions or a Custom Color Palette?
            </h2>

            <p className="text-stoneWarm-300 text-sm sm:text-base mt-3 leading-relaxed font-normal">
              Every home is unique. Since we manufacture all furniture directly in our Delhi factory, we can customize width, height, internal partition layout, and match any Asian Paints or ICA/Sirca PU polish shade code.
            </p>

            {/* Micro Feature Tags */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-5 text-xs text-stoneWarm-200">
              <div className="flex items-center space-x-2 font-medium">
                <Ruler className="w-4 h-4 text-gold-300" />
                <span>Custom Foot / MM Sizing</span>
              </div>
              <div className="flex items-center space-x-2 font-medium">
                <Palette className="w-4 h-4 text-amber-300" />
                <span>Any PU Polish Shade</span>
              </div>
              <div className="flex items-center space-x-2 font-medium">
                <Hammer className="w-4 h-4 text-emerald-300" />
                <span>Architectural Custom Builds</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="shrink-0">
            <a
              href={generateGeneralWhatsAppUrl('Custom Size & Architectural Consultation')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm shadow-xl shadow-emerald-950/40 flex items-center space-x-2.5 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white text-transparent" />
              <span>Discuss Custom Design on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
