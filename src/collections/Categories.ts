import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
    group: 'Blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the category (e.g., "Technology", "Travel")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the category name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'A brief description of what this category is about',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color code for category styling (e.g., #FF5733)',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or emoji for the category',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title for category pages',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description for category pages',
          },
        },
      ],
      admin: {
        description: 'SEO settings for this category',
      },
    },
  ],
}
