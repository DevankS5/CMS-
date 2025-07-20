import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
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
        description: 'The name of the tag (e.g., "JavaScript", "React", "Tutorial")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the tag name',
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
        description: 'A brief description of what this tag represents',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color code for tag styling (e.g., #4CAF50)',
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
            description: 'SEO title for tag pages',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description for tag pages',
          },
        },
      ],
      admin: {
        description: 'SEO settings for this tag',
      },
    },
  ],
}
