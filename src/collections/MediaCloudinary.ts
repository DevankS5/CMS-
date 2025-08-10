import type { CollectionConfig } from 'payload'

export const MediaCloudinary: CollectionConfig = {
  slug: 'media-cloudinary',
  upload: {
    // Remove staticDir to use cloud storage
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
