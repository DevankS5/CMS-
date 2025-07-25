/**
 * BACKUP: Enhanced Markdown Features Configuration
 * Created: July 23, 2025
 * 
 * This is a STABLE working configuration with enhanced markdown-like features
 * Features included:
 * - Text formatting: Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Inline Code
 * - Headings: H1-H6
 * - Lists: Unordered, Ordered, Checklist
 * - Block elements: Blockquotes, Horizontal Rules
 * - Media: Image uploads with alt text
 * - Links: Hyperlink support
 * - Indentation controls
 * 
 * STATUS: ✅ STABLE - Use this as baseline for future development
 */

import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  UnderlineFeature,
  HeadingFeature,
  LinkFeature,
  UploadFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  SuperscriptFeature,
  SubscriptFeature,
  StrikethroughFeature,
  IndentFeature,
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt'],
    group: 'Blog',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main title of your blog post',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "my-awesome-post")',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'A brief summary of the post (used in previews and SEO)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [
          // Basic text formatting
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SuperscriptFeature(),
          SubscriptFeature(),
          InlineCodeFeature(),
          
          // Headings
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
          
          // Lists
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          
          // Block elements
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          
          // Links and media
          LinkFeature(),
          
          // Image upload feature
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'alt',
                    type: 'text',
                    required: false,
                    admin: {
                      description: 'Alternative text for accessibility',
                    },
                  },
                  {
                    name: 'caption',
                    type: 'text',
                    required: false,
                    admin: {
                      description: 'Image caption',
                    },
                  },
                ],
              },
            },
          }),
          
          // Text alignment and indentation
          IndentFeature(),
        ],
      }),
      admin: {
        description: 'The main content of your blog post with enhanced rich text features including markdown-like formatting, lists, blockquotes, and images',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Featured image for the post (used in previews and headers)',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Author of the post',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      admin: {
        description: 'Primary category for the post',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: 'Tags for categorizing and searching posts',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        description: 'Publication status of the post',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'Date when the post was/will be published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO Meta',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Custom SEO title (defaults to post title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Custom SEO description (defaults to excerpt)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'SEO keywords (comma-separated)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Custom Open Graph image (defaults to featured image)',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        // Auto-generate slug from title if not provided
        if (operation === 'create' && data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
        }

        // Set publishedAt date when status changes to published
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date()
        }

        return data
      },
    ],
  },
}
