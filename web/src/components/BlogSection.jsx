import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';

const fallbackGuides = [
  {
    title: 'The Definitive Guide to Fluted Sideboards & Consoles in Delhi NCR',
    slug: 'fluted-sideboards-delhi',
    category: 'Sideboards & Consoles',
    readTime: '6 min read',
    excerpt: 'Everything Delhi homeowners need to know about choosing custom fluted sideboards, HDMR vs solid wood, and factory-direct pricing.',
    coverUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Modern Crockery Unit Designs for Indian Dining Rooms',
    slug: 'modern-crockery-units',
    category: 'Apartment Design',
    readTime: '5 min read',
    excerpt: 'From fluted glass doors to integrated warm LED profiles, discover modern crockery cabinet inspirations tailored for modern apartments.',
    coverUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'What is PU Polish Furniture? High-Gloss vs Matte & Factory Costs',
    slug: 'pu-polish-guide',
    category: 'Finishes & Polish',
    readTime: '7 min read',
    excerpt: 'Detailed comparison between PU polish, Duco paint, and Melamine finishes with cost breakdowns direct from our Delhi workshop.',
    coverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Modern Wooden Pooja Mandir Designs for Apartments',
    slug: 'wooden-pooja-mandir-designs',
    category: 'Sacred Architecture',
    readTime: '5 min read',
    excerpt: 'Vastu-aligned contemporary mandir designs with brass accents, CNC jali work, and soft ambient backlighting.',
    coverUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?w=800&auto=format&fit=crop&q=80',
  },
];

export default function BlogSection({ blogPosts }) {
  const posts = blogPosts && blogPosts.length > 0 ? blogPosts : fallbackGuides;

  return (
    <section id="guides-section" className="py-16 md:py-24 bg-stoneWarm-100 border-t border-stoneWarm-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-gold-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Workshop Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stoneWarm-900 font-display tracking-tight">
              Design Guides &amp; <span className="gold-gradient-text font-display">Buying Insights</span>
            </h2>
            <p className="mt-2 text-stoneWarm-600 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
              Factory-direct advice on luxury PU finishes, custom fluted carpentry, vastu guidelines, and space planning direct from our Delhi master craftsmen.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <a
              href="/blog/"
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-stoneWarm-800 hover:text-gold-700 transition group"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post) => (
            <article
              key={post.slug || post._id}
              className="bg-white border border-stoneWarm-200 rounded-2xl overflow-hidden hover:border-gold-400 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-warm-card hover:shadow-warm-hover"
            >
              {/* Cover Image */}
              <a href={`/blog/${post.slug}/`} className="relative block aspect-[16/10] overflow-hidden bg-stoneWarm-100">
                {post.coverUrl ? (
                  <img
                    src={post.coverUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stoneWarm-200 text-stoneWarm-500">
                    <BookOpen className="w-8 h-8 text-gold-600/40" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-white/95 text-stoneWarm-800 border border-stoneWarm-200 shadow-xs">
                    {post.category || 'Guide'}
                  </span>
                </div>
              </a>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-stoneWarm-500 mb-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-stoneWarm-400" />
                    <span>{post.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="text-stoneWarm-900 text-base font-bold leading-snug group-hover:text-gold-700 transition-colors line-clamp-2 mb-2">
                    <a href={`/blog/${post.slug}/`}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-stoneWarm-600 text-xs leading-relaxed line-clamp-3 mb-4 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <a
                  href={`/blog/${post.slug}/`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold-700 hover:text-gold-800 pt-3 border-t border-stoneWarm-200 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
