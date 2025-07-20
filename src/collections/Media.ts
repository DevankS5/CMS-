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
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['image/*'],
    required: false, // Make file upload optional
  },
}
