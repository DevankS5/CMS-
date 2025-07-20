import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Admin',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the user',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'author',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      admin: {
        description: 'User role and permissions',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Brief biography for author pages',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile picture',
      },
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'website',
          type: 'text',
          admin: {
            description: 'Personal website URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X handle',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            description: 'GitHub profile URL',
          },
        },
      ],
      admin: {
        description: 'Social media links',
      },
    },
  ],
}
