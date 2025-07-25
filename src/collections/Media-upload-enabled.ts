/**
 * BACKUP: Enhanced Markdown Features Configuration + UPLOAD SUPPORT
 * Updated: July 24, 2025
 * 
 * This is a STABLE working configuration with enhanced markdown-like features
 * Features included:
 * - Text formatting: Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Inline Code
 * - Headings: H1-H6
 * - Lists: Unordered, Ordered, Checklist
 * - Block elements: Blockquotes, Horizontal Rules
 * - Media: Image uploads with alt text (FIXED: Upload collections enabled)
 * - Links: Hyperlink support
 * - Indentation controls
 * 
 * STATUS: ✅ STABLE - Use this as baseline for future development
 * UPLOAD: ✅ WORKING - Media collection properly configured as upload collection
 */

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the image',
      },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Tags for organizing images',
        position: 'sidebar',
      },
    },
    {
      name: 'photographer',
      type: 'text',
      admin: {
        description: 'Photographer or image source credit',
        position: 'sidebar',
      },
    },
  ],
}
