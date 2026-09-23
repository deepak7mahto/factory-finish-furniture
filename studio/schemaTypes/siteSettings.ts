import { defineType, defineField, defineArrayMember } from 'sanity';
import { CogIcon } from '@sanity/icons';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website Settings & Brand',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      initialValue: 'Factory Finish Furniture',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Architectural Luxury Direct from Delhi Factory Workshop',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (Digits only, including country code)',
      type: 'string',
      description: 'e.g. 918826236138',
      initialValue: '918826236138',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Phone Display String',
      type: 'string',
      initialValue: '+91 88262 36138',
    }),
    defineField({
      name: 'workshopLocation',
      title: 'Workshop Location',
      type: 'string',
      initialValue: 'Delhi NCR, India',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Top Announcement Banner Text',
      type: 'string',
      initialValue: 'FACTORY-DIRECT SAVINGS: SAVE 40-50% VS RETAIL SHOWROOMS',
    }),
    defineField({
      name: 'warrantyText',
      title: 'Warranty Guarantee Statement',
      type: 'string',
      initialValue: '5-Year Paint & Color Fade Warranty on all PU Finishes',
    }),
    defineField({
      name: 'trustPillars',
      title: 'Trust Pillars (Homepage)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Pillar Title' }),
            defineField({ name: 'description', type: 'string', title: 'Description' }),
          ],
        }),
      ],
    }),
  ],
});
