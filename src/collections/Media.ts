import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'imageUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'Paste a remote image URL here if not uploading a file',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    // Use local storage for uploads
    staticDir: '../media',
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
    ],
  },
}
