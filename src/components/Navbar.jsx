import React from 'react';
import { MessageCircle, PhoneCall, PlusCircle, Sparkles, MapPin, BookOpen } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function Navbar({ onOpenAdmin, activeCategory, onSelectCategory }) {
  const categories = [
    'All',
    'Sideboards & Consoles',
    'Display & Bar Cabinets',
    'LED Dressing Tables',
    'Fluted Wardrobes',
    'Pooja Mandirs'
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#121417]/95 backdrop-blur-md border-b border-gold-500/20 shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700 text-charcoal-950 px-4 py-1.5 text-xs font-semibold text-center flex items-center justify-center space-x-3">
        <span className="flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FACTORY-DIRECT SAVINGS: SAVE 40-50% VS RETAIL SHOWROOMS</span>
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:flex items-center space-x-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Delhi NCR Workshop • Pan-India Delivery</span>
        </span>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => onSelectCategory('All')} 
            className="cursor-pointer flex flex-col group"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl md:text-2xl font-bold tracking-widest text-white font-luxury group-hover:text-gold-400 transition-colors">
                FACTORY FINISH
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 font-sans tracking-normal">
                FURNITURE
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
              Architectural Luxury • Handcrafted in Delhi
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Design Guides Link */}
            <a
              href="/blog/"
              className="flex items-center space-x-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 px-3 py-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 transition shadow-sm"
              title="Design Guides & Buying Insights"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Design Guides</span>
            </a>

            {/* Phone Quick Call */}
            <a
              href={`tel:${siteConfig.phoneDisplay.replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center space-x-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-700/60 hover:border-slate-600 transition"
              title="Call Workshop"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
              <span>{siteConfig.phoneDisplay}</span>
            </a>

            {/* Admin / Add Listing */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-gold-300 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition"
              title="Add Listing"
            >
              <PlusCircle className="w-4 h-4 text-gold-400" />
              <span className="hidden md:inline">Add Listing</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={generateGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm shadow-lg shadow-green-900/30 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Category Filter Pills in Header */}
        <div className="flex items-center space-x-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/80">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-charcoal-950 font-bold shadow-md shadow-gold-500/20'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
