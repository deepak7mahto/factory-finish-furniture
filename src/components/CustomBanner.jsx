import React from 'react';
import { Sparkles, MessageCircle, Ruler, Palette, Hammer } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function CustomBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1b1e24] via-[#21262f] to-[#1a1d22] border border-gold-500/30 p-8 sm:p-12 shadow-2xl">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interior Designers &amp; Homeowners</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Have Specific Dimensions or a Custom Color Palette?
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
              Every home is unique. Since we manufacture all furniture directly in our Delhi factory, we can customize width, height, internal partition layout, and match any Asian Paints or ICA/Sirca PU polish shade code.
            </p>

            {/* Micro Feature Tags */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Ruler className="w-4 h-4 text-gold-400" />
                <span>Custom MM / Foot Sizing</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>Any PU Polish Shade</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Hammer className="w-4 h-4 text-emerald-400" />
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
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-charcoal-950 font-extrabold text-sm shadow-xl shadow-gold-500/20 flex items-center space-x-2 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-charcoal-950 text-transparent" />
              <span>Discuss Custom Design on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
