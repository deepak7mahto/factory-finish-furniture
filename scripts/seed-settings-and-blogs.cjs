const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'th649m10',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sklgifHLgNCM79Ht0OcAJm89R3VzTeA7czHSUwzUTKwLhGp1CsCUrwjJ96rlNxfY6qY8IRfTMQChAn6HwPangPYPkeRVfjpsvhtJHMhQRZZlPX9EILTgZm6Bv732VO9PGKDIX2sRftTVS9NlOFyxROlXVMB9aJYD1me93gwm2cdlSszLCGoj',
  useCdn: false,
});

async function seed() {
  console.log('🚀 Seeding Website Settings & Brand singleton...');

  // 1. Seed siteSettings
  const settingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'Factory Finish Furniture',
    tagline: 'Architectural Luxury • Handcrafted in Delhi',
    whatsappNumber: '918826236138',
    phoneDisplay: '+91 88262 36138',
    workshopLocation: 'Delhi NCR Workshop • Pan-India Delivery',
    announcementBar: '✨ FACTORY-DIRECT SAVINGS: SAVE 40–50% VS RETAIL SHOWROOMS • Delhi NCR Workshop • Pan-India Delivery',
    warrantyText: '5-Year Paint & Color Fade Warranty on all PU Finishes',
    trustPillars: [
      {
        _key: 'pillar1',
        title: 'Factory Direct Pricing',
        description: 'Save 40-50% compared to luxury retail showrooms by ordering direct from the manufacturer.',
      },
      {
        _key: 'pillar2',
        title: 'Bespoke Customization',
        description: 'Every sideboard, console, dresser, and temple is custom built to your room dimensions and color palette.',
      },
      {
        _key: 'pillar3',
        title: '5-Year Guarantee',
        description: 'Automotive PU polish resists heat, stains, and UV yellowing with a 5-year warranty.',
      },
      {
        _key: 'pillar4',
        title: 'Safe Crated Shipping',
        description: 'Heavy-duty wooden crating and transit insurance for doorstep delivery across India.',
      },
    ],
  };

  await client.createOrReplace(settingsDoc);
  console.log('✅ Website Settings & Brand document created & published!');

  // 2. Fetch some product references for blog links
  const products = await client.fetch('*[_type == "product"]{ _id, title, category }');
  const flutedProducts = products.filter(p => p.category === 'Sideboards & Consoles').map(p => ({
    _type: 'reference',
    _ref: p._id,
    _key: p._id,
  })).slice(0, 3);

  const displayProducts = products.filter(p => p.category === 'Display & Bar Cabinets').map(p => ({
    _type: 'reference',
    _ref: p._id,
    _key: p._id,
  })).slice(0, 3);

  const mandirProducts = products.filter(p => p.category === 'Pooja Mandirs').map(p => ({
    _type: 'reference',
    _ref: p._id,
    _key: p._id,
  }));

  // 3. Find image assets
  const assets = await client.fetch('*[_type == "sanity.imageAsset"]{ _id, originalFilename }');
  const findAsset = (hint) => {
    const found = assets.find(a => (a.originalFilename && a.originalFilename.includes(hint)));
    return found ? found._id : assets[0]._id;
  };

  console.log('🚀 Seeding 4 Design Guides / Blog Posts...');

  const blogPosts = [
    {
      _id: 'blog-fluted-sideboards-delhi',
      _type: 'blogPost',
      title: 'The Definitive Guide to Fluted Sideboards & Consoles in Delhi NCR',
      slug: { _type: 'slug', current: 'fluted-sideboards-delhi' },
      category: 'Sideboards & Consoles',
      publishedAt: '2026-09-18T10:00:00Z',
      readTime: '6 min read',
      excerpt: 'Discover why architectural fluted sideboards and ribbed glass consoles are dominating modern Delhi homes. Sizing rules (5ft vs 6ft), PU polish vs veneer, and direct factory pricing.',
      coverImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: 'image-0480fa2758e50f5c14660b6ea5d555eac605d11d-960x720-jpg' },
        alt: 'Modern white and gold fluted sideboard with center glass showcase in Delhi workshop',
      },
      featuredProducts: flutedProducts,
      body: [
        {
          _key: 'b1',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c1',
              _type: 'span',
              text: 'Fluted furniture—characterized by repeating three-dimensional vertical grooves—has transitioned from an architectural trend to a timeless luxury staple in Indian homes. Whether placed in a dining room as a crockery console or in a living foyer as a statement credenza, ribbed textures introduce tactile warmth and visual rhythm.',
            },
          ],
        },
        {
          _key: 'b2',
          _type: 'block',
          style: 'h2',
          children: [
            {
              _key: 'c2',
              _type: 'span',
              text: '1. Standard Sizing: 5 Feet vs. 6 Feet',
            },
          ],
        },
        {
          _key: 'b3',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c3',
              _type: 'span',
              text: 'A common dilemma is balancing storage volume with room proportions. For apartments in Gurgaon, Noida, and South Delhi with dining areas between 150 to 220 sq ft, a 5-foot console provides the ideal proportion. It accommodates two large side storage cabinets and a 2-door center glass vitrine while leaving comfortable 3-foot clearance on either side for dining chair movement.',
            },
          ],
        },
      ],
    },
    {
      _id: 'blog-modern-crockery-units',
      _type: 'blogPost',
      title: 'Modern Crockery Unit Designs for Indian Dining Rooms',
      slug: { _type: 'slug', current: 'modern-crockery-units' },
      category: 'Apartment Design',
      publishedAt: '2026-09-19T10:00:00Z',
      readTime: '7 min read',
      excerpt: 'How full-height glass vitrines, warm LED backlights, and 3D textured drawers are redefining modern Indian crockery and barware storage.',
      coverImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: 'image-104f8360ea92732e946b7b1ac1e3fa4b88460e67-720x960-jpg' },
        alt: 'Modern 3D textured luxury crockery display unit with warm LED lights',
      },
      featuredProducts: displayProducts,
      body: [
        {
          _key: 'b1',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c1',
              _type: 'span',
              text: 'Gone are the days of bulky, dark-wood china hutches. Today\'s Indian dining rooms celebrate airy, illuminated architectural showcases combining toughened tinted glass, slim anodized profile frames, and warm 3000K concealed LED channel lighting.',
            },
          ],
        },
      ],
    },
    {
      _id: 'blog-wooden-pooja-mandir-designs',
      _type: 'blogPost',
      title: 'Modern Wooden Pooja Mandir Designs for Apartments',
      slug: { _type: 'slug', current: 'wooden-pooja-mandir-designs' },
      category: 'Sacred Architecture',
      publishedAt: '2026-09-20T10:00:00Z',
      readTime: '5 min read',
      excerpt: 'Vastu-aligned modern apartment temples with CNC laser jali cutting, concealed warm illumination, and multi-drawer storage for modern flats.',
      coverImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: 'image-975829b56d8f5610f901a1657e9a61111191880f-806x960-jpg' },
        alt: 'Modern apartment wooden pooja mandir with backlit CNC laser jali pattern',
      },
      featuredProducts: mandirProducts,
      body: [
        {
          _key: 'b1',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c1',
              _type: 'span',
              text: 'Creating a serene, sacred haven within modern high-rise apartments requires thoughtful balance between sacred Vastu guidelines and contemporary interior design. Our Delhi workshop crafts specialized wall-mounted and floor-standing temple units featuring intricate CNC laser cutting and warm backlighting.',
            },
          ],
        },
      ],
    },
    {
      _id: 'blog-pu-polish-guide',
      _type: 'blogPost',
      title: 'What is PU Polish Furniture? High-Gloss vs Matte & Factory Costs',
      slug: { _type: 'slug', current: 'pu-polish-guide' },
      category: 'Finishes & Polish',
      publishedAt: '2026-09-21T10:00:00Z',
      readTime: '8 min read',
      excerpt: 'Automotive polyurethane (PU) polish vs melamine, duco, and laminate. Why PU lasts 15+ years without yellowing or water marks.',
      coverImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: 'image-5f3bd3595ea13af5a68a04bc256ecb05680983ea-960x617-jpg' },
        alt: 'Automotive grade PU polish applied to emerald green sideboard cabinet',
      },
      featuredProducts: flutedProducts.slice(0, 2),
      body: [
        {
          _key: 'b1',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c1',
              _type: 'span',
              text: 'Polyurethane (PU) finish is the gold standard for luxury furniture worldwide. Originally developed for luxury automotive exteriors, Italian PU polish forms a rock-hard, non-porous molecular shield over high-density moisture-resistant wood.',
            },
          ],
        },
      ],
    },
  ];

  for (const post of blogPosts) {
    await client.createOrReplace(post);
    console.log(`✅ Seeded blog: "${post.title}"`);
  }

  console.log('\n🎉 Successfully seeded Website Settings & all 4 Design Guides into Sanity!');
}

seed().catch(console.error);
