import React from 'react';
import { Factory, Sparkles, ShieldCheck, Truck, ArrowRight, MessageCircle } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

const iconMap = {
  0: { icon: Factory, color: 'text-gold-400', bg: 'bg-gold-500/10 border-gold-500/20' },
  1: { icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  2: { icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  3: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
};

export default function Hero({ onExploreClick, productCount = 28, siteSettings }) {
  const workshopLocation = siteSettings?.workshopLocation || 'Delhi Workshop';
  const pillars = (siteSettings?.trustPillars && siteSettings.trustPillars.length > 0)
    ? siteSettings.trustPillars
    : [
        {
          title: '100% Factory Direct',
          description: 'Buy directly from the manufacturing unit in Delhi. Save ₹15,000–₹40,000 per piece compared to branded retail showrooms.',
        },
        {
          title: 'Automotive PU Polish',
          description: 'Silky-smooth, non-yellowing Polyurethane polish with water and scratch-resistant topcoats in high-gloss or matte satin.',
        },
        {
          title: '5-Year Warranty',
          description: 'Guaranteed protection against paint discoloration, edge peeling, and structural workmanship defects.',
        },
        {
          title: 'Pan-India Delivery',
          description: 'Heavy-duty wooden crated packaging with bubble wrapping and transit coverage for safe doorstep delivery across India.',
        },
      ];
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-[#121417] via-[#101215] to-[#0f1114]">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 md:w-[650px] h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct from Delhi Workshop • Zero Retail Markup</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight md:leading-none mb-6">
            Architectural Luxury, <br />
            <span className="gold-gradient-text font-luxury">Direct Factory Rates</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Experience high-end fluted sideboards, center glass showcases, LED touch dressers, and designer wardrobes. Handcrafted in our Delhi factory with multi-coat PU polish, premium HDMR, and a 5-year finish warranty.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-charcoal-950 font-bold text-sm shadow-xl shadow-gold-500/20 flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5"
            >
              <span>Explore {productCount} Verified Designs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={generateGeneralWhatsAppUrl('Custom Size & Color Consultation')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm flex items-center justify-center space-x-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Request Custom Size / Quote</span>
            </a>
          </div>
        </div>

        {/* Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800/80">
          {pillars.map((pillar, idx) => {
            const style = iconMap[idx % 4];
            const IconComponent = style.icon;
            return (
              <div
                key={pillar.title || idx}
                className="bg-[#16191d]/80 border border-slate-800/80 rounded-2xl p-5 hover:border-gold-500/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${style.bg} border flex items-center justify-center mb-3`}>
                  <IconComponent className={`w-5 h-5 ${style.color}`} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{pillar.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {pillar.description || pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
