import { defineType, defineField, defineArrayMember } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const product = defineType({
  name: 'product',
  title: 'Furniture Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Key)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Sideboards & Consoles',
          'Display & Bar Cabinets',
          'LED Dressing Tables',
          'Fluted Wardrobes',
          'Pooja Mandirs',
          'Storage Cabinets',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Dimensions / Size',
      type: 'string',
      description: 'e.g. 5 × 3 Feet, 6 × 6.5 Feet, or Custom Size',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isCustomizable',
      title: 'Custom Sizing & Color Available?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'material',
      title: 'Material Specifications',
      type: 'string',
      description: 'e.g. Premium Action TESA HDMR / Marine Plywood with Toughened Glass',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finish',
      title: 'Finish Type',
      type: 'string',
      description: 'e.g. High-Gloss PU Polish, Satin Matte PU, Deco Finish',
      initialValue: 'High-Quality Automotive-Grade PU Polish',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color & Accent Details',
      type: 'string',
      description: 'e.g. Crisp White with Rich Brass/Gold Trims',
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty Guarantee',
      type: 'string',
      initialValue: '5 Years Paint & Color Fade Warranty',
    }),
    defineField({
      name: 'badge',
      title: 'Highlight Badge',
      type: 'string',
      options: {
        list: ['Best Seller', 'New Design', 'Direct Factory Price', 'Custom Favorite'],
      },
    }),
    defineField({
      name: 'images',
      title: 'Product Photographs (Gallery)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text (for SEO & Accessibility)',
              type: 'string',
              description: 'e.g. White and gold fluted sideboard with center glass showcase',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'features',
      title: 'Key Craftsmanship Features',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Bullet points highlighting fluting, LED channels, soft-close hardware, etc.',
    }),
    defineField({
      name: 'storage',
      title: 'Internal Storage Layout',
      type: 'string',
      description: 'e.g. 2 closed side cabinets + spacious 2-door center glass display',
    }),
    defineField({
      name: 'hardware',
      title: 'Hardware & Fittings',
      type: 'string',
      description: 'e.g. Heavy-duty telescopic channels, gold-plated profile handles, soft-close hinges',
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description / Workshop Notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'inStock',
      title: 'Available for Immediate Build / In Stock',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
    },
  },
});
