import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { CogIcon } from '@sanity/icons/Cog';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { TagIcon } from '@sanity/icons/Tag';

export default defineConfig({
  name: 'default',
  title: 'Factory Finish Furniture',

  projectId: 'th649m10',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('product')
              .title('Furniture Product')
              .icon(TagIcon),
            S.documentTypeListItem('blogPost')
              .title('Design Guide / Blog Post')
              .icon(DocumentTextIcon),
            S.listItem()
              .title('Website Settings & Brand')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
