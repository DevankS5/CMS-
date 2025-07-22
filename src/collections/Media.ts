import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
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
        description: 'Alternative text for the image',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: false,
      admin: {
        description: 'Image URL (for external images)',
      },
    },
  ],
}
