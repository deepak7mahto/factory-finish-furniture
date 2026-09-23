import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function Footer({ siteSettings, blogPosts }) {
  const brandName = siteSettings?.brandName || siteConfig.brandName;
  const tagline = siteSettings?.tagline || siteConfig.tagline;
  const warranty = siteSettings?.warrantyText || siteConfig.warranty;
  const location = siteSettings?.workshopLocation || siteConfig.location;
  const phoneDisplay = siteSettings?.phoneDisplay || siteConfig.phoneDisplay;
  const whatsappNumber = siteSettings?.whatsappNumber || siteConfig.whatsappNumber;

  const defaultBlogs = [
    { title: 'Fluted Sideboards & Consoles', slug: 'fluted-sideboards-delhi' },
    { title: 'PU Polish vs Melamine Guide', slug: 'pu-polish-guide' },
    { title: 'Modern Crockery Units', slug: 'modern-crockery-units' },
    { title: 'Wooden Pooja Mandir Vastu', slug: 'wooden-pooja-mandir-designs' },
  ];

  const guides = blogPosts && blogPosts.length > 0
    ? blogPosts.slice(0, 4)
    : defaultBlogs;

  return (
    <footer className="bg-stoneWarm-900 border-t border-stoneWarm-800 text-stoneWarm-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-bold tracking-widest text-white font-display">
                {brandName.toUpperCase()}
              </span>
            </div>
            <p className="text-stoneWarm-300 text-xs leading-relaxed mb-4 font-normal">
              {tagline}. High-end fluted sideboards, center glass showcases, and custom wardrobes with 5-year finish warranty.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{warranty}</span>
            </div>
          </div>

          {/* Col 2: Design Guides */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3.5">
              Design Guides
            </h4>
            <ul className="space-y-2 text-xs">
              {guides.map((g) => (
                <li key={g.slug}>
                  <a href={`/blog/${g.slug}/`} className="text-stoneWarm-300 hover:text-gold-300 transition font-normal">
                    {g.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="/blog/" className="text-gold-400 hover:underline pt-1 inline-block font-semibold">
                  View All Guides →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3.5">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2 text-stoneWarm-300">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{location}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <a href={`tel:${phoneDisplay.replace(/\s+/g, '')}`} className="text-stoneWarm-300 hover:text-white transition">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <a
                  href={generateGeneralWhatsAppUrl('Footer Inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stoneWarm-300 hover:text-[#16A34A] transition font-medium"
                >
                  WhatsApp: +{whatsappNumber}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Direct & Quality */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3.5">
              Workshop Direct
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-stoneWarm-200 font-medium">
                  Direct Factory Wholesale Pricing
                </span>
              </li>
              <li>
                <span className="text-stoneWarm-300">
                  Custom Sizing &amp; PU Polish Colors
                </span>
              </li>
              <li>
                <span className="text-stoneWarm-300">
                  Architectural Consultations by Appointment
                </span>
              </li>
              <li className="text-stoneWarm-400 pt-2 text-xs">
                Pan-India Safe Wooden Crating &amp; Transit Insurance
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stoneWarm-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stoneWarm-400 gap-4">
          <p>© {new Date().getFullYear()} Factory Finish Furniture. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Handcrafted with precision in Delhi, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
