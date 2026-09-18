import React from 'react';
import { MapPin, Phone, MessageCircle, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-[#0c0e11] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-bold tracking-widest text-white font-luxury">
                FACTORY FINISH
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 font-sans">
                FURNITURE
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Direct-from-manufacturer architectural luxury furniture. Engineered in Delhi with premium PU polish, heavy-duty hardware, and 5-year color fade warranty.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>5 Years Paint &amp; Finish Assurance</span>
            </div>
          </div>

          {/* Col 2: Workshop & Contact */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3">
              Workshop &amp; Delivery
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>Delhi NCR Factory Workshop, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <a href={`tel:${siteConfig.phoneDisplay.replace(/\s+/g, '')}`} className="hover:text-white transition">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a 
                  href={generateGeneralWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition"
                >
                  WhatsApp: +{siteConfig.whatsappNumber}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Marketplace & Links */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3">
              Marketplace Profiles
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={siteConfig.socials.facebookMarketplace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-gold-400 transition"
                >
                  <span>Facebook Marketplace Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-white transition underline underline-offset-2"
                >
                  Admin: Paste &amp; Parse Listing
                </button>
              </li>
              <li className="text-slate-500 pt-2 text-[11px]">
                Pan-India Safe Wooden Crating &amp; Transit Insurance
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Factory Finish Furniture. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Handcrafted with precision in Delhi, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
