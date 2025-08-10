import type { CollectionConfig } from 'payload'

const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // When Cloudinary is configured, disable local storage completely
    ...(isCloudinaryConfigured ? { disableLocalStorage: true } : { staticDir: 'media' }),
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
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Ensure a generic `url` is always present for admin previews / frontend components.
        // Cloudinary plugin may populate `cloudinaryUrl` / `originalUrl` but some UI code expects `url`.
        if (doc && !doc.url) {
          doc.url =
            doc.cloudinaryUrl ||
            doc.originalUrl ||
            doc.transformedUrl ||
            doc?.sizes?.thumbnail?.cloudinaryUrl ||
            doc?.sizes?.thumbnail?.url ||
            doc?.sizes?.card?.cloudinaryUrl ||
            doc?.sizes?.card?.url ||
            doc?.sizes?.tablet?.cloudinaryUrl ||
            doc?.sizes?.tablet?.url ||
            doc.url // last resort (no-op)
        }

        // Fix thumbnailURL: when local storage is disabled Payload may still set a relative path.
        // Replace it with a Cloudinary URL so admin list shows previews.
        if (doc) {
          const cloudThumb =
            doc?.sizes?.thumbnail?.cloudinaryUrl ||
            doc?.sizes?.thumbnail?.url ||
            doc.cloudinaryUrl ||
            doc.url
          if (
            cloudThumb &&
            (!doc.thumbnailURL || doc.thumbnailURL.startsWith('/api/media/file/'))
          ) {
            doc.thumbnailURL = cloudThumb
          }
        }
        return doc
      },
    ],
    beforeChange: [
      ({ data }) => {
        // Normalize: if only cloudinaryUrl present, mirror it to originalUrl for consistency
        if (data) {
          if (!data.originalUrl && data.cloudinaryUrl) data.originalUrl = data.cloudinaryUrl
          if (!data.url && data.cloudinaryUrl) data.url = data.cloudinaryUrl
        }
        return data
      },
    ],
  },
}
