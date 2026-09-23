import React from 'react';
import { MessageCircle, PhoneCall, PlusCircle, Sparkles, MapPin, BookOpen } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function Navbar({ onOpenAdmin, activeCategory, onSelectCategory, siteSettings }) {
  const categories = [
    'All',
    'Sideboards & Consoles',
    'Display & Bar Cabinets',
    'LED Dressing Tables',
    'Fluted Wardrobes',
    'Pooja Mandirs'
  ];

  const announcement = siteSettings?.announcementBar || 'FACTORY-DIRECT SAVINGS: SAVE 40-50% VS RETAIL SHOWROOMS';
  const phoneDisplay = siteSettings?.phoneDisplay || siteConfig.phoneDisplay;
  const workshopLocation = siteSettings?.workshopLocation || 'Delhi NCR Workshop • Pan-India Delivery';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stoneWarm-200 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center space-x-3 shadow-sm">
        <span className="flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-200" />
          <span className="tracking-wide">{announcement}</span>
        </span>
        <span className="hidden md:inline text-gold-200">•</span>
        <span className="hidden md:flex items-center space-x-1.5 text-gold-100">
          <MapPin className="w-3.5 h-3.5 text-gold-200" />
          <span>{workshopLocation}</span>
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
              <span className="text-xl md:text-2xl font-bold tracking-widest text-stoneWarm-900 font-display group-hover:text-gold-600 transition-colors">
                FACTORY FINISH
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gold-100 border border-gold-300 text-gold-700 font-sans font-semibold tracking-normal">
                DELHI ATELIER
              </span>
            </div>
            <span className="text-xs text-stoneWarm-600 tracking-wider uppercase font-medium mt-0.5">
              Architectural Luxury • Direct Factory Workshop
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Design Guides Link */}
            <a
              href="/blog/"
              className="flex items-center space-x-1.5 text-xs font-semibold text-stoneWarm-800 hover:text-gold-700 px-3 py-2 rounded-lg bg-stoneWarm-100 hover:bg-stoneWarm-200 border border-stoneWarm-200 transition shadow-sm"
              title="Design Guides & Buying Insights"
            >
              <BookOpen className="w-3.5 h-3.5 text-gold-600" />
              <span>Design Guides</span>
            </a>

            {/* Phone Quick Call */}
            <a
              href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-stoneWarm-800 hover:text-stoneWarm-950 px-3 py-2 rounded-lg border border-stoneWarm-300 bg-white hover:bg-stoneWarm-50 transition shadow-sm"
              title="Call Workshop"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-600" />
              <span>{phoneDisplay}</span>
            </a>

            {/* Admin / Add Listing */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1.5 text-xs font-semibold text-stoneWarm-700 hover:text-stoneWarm-950 px-3 py-2 rounded-lg bg-stoneWarm-100 hover:bg-stoneWarm-200 border border-stoneWarm-200 transition"
              title="Add Listing"
            >
              <PlusCircle className="w-4 h-4 text-gold-600" />
              <span className="hidden md:inline">Add Listing</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={generateGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/15 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Category Filter Pills in Header */}
        <div className="flex items-center space-x-2 overflow-x-auto py-2.5 scrollbar-none border-t border-stoneWarm-200">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-stoneWarm-900 text-white shadow-sm'
                    : 'bg-white text-stoneWarm-700 hover:text-stoneWarm-950 hover:bg-stoneWarm-100 border border-stoneWarm-300'
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
