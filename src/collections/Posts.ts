import type { CollectionConfig } from 'payload'
import { 
  lexicalEditor,
  BlocksFeature,
  LinkFeature,
  UploadFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  ChecklistFeature,
  OrderedListFeature,
  UnorderedListFeature,
  IndentFeature,
  AlignFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
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
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief summary of the post (used in previews and SEO)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          InlineCodeFeature(),
          ParagraphFeature(),
          AlignFeature(),
          IndentFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          LinkFeature({
            enabledCollections: ['posts', 'categories'],
          }),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'alt',
                    type: 'text',
                    required: true,
                  },
                ]
              }
            }
          }),
          BlocksFeature({
            blocks: [
              {
                slug: 'code',
                fields: [
                  {
                    name: 'language',
                    type: 'select',
                    defaultValue: 'javascript',
                    options: [
                      { label: 'JavaScript', value: 'javascript' },
                      { label: 'TypeScript', value: 'typescript' },
                      { label: 'Python', value: 'python' },
                      { label: 'Java', value: 'java' },
                      { label: 'C#', value: 'csharp' },
                      { label: 'C++', value: 'cpp' },
                      { label: 'PHP', value: 'php' },
                      { label: 'Ruby', value: 'ruby' },
                      { label: 'Go', value: 'go' },
                      { label: 'Rust', value: 'rust' },
                      { label: 'HTML', value: 'html' },
                      { label: 'CSS', value: 'css' },
                      { label: 'SQL', value: 'sql' },
                      { label: 'JSON', value: 'json' },
                      { label: 'YAML', value: 'yaml' },
                      { label: 'Markdown', value: 'markdown' },
                      { label: 'Bash/Shell', value: 'bash' },
                      { label: 'PowerShell', value: 'powershell' },
                      { label: 'Docker', value: 'docker' },
                      { label: 'Plain Text', value: 'text' },
                    ],
                  },
                  {
                    name: 'code',
                    type: 'code',
                    required: true,
                  },
                  {
                    name: 'filename',
                    type: 'text',
                    admin: {
                      description: 'Optional filename to display (e.g., "app.js")',
                    },
                  },
                  {
                    name: 'showLineNumbers',
                    type: 'checkbox',
                    defaultValue: true,
                  },
                  {
                    name: 'highlightLines',
                    type: 'text',
                    admin: {
                      description: 'Comma-separated line numbers to highlight (e.g., "1,3,5-7")',
                    },
                  },
                ],
                labels: {
                  singular: 'Code Block',
                  plural: 'Code Blocks',
                },
                interfaceName: 'CodeBlock',
              },
              {
                slug: 'callout',
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    defaultValue: 'info',
                    options: [
                      { label: 'Info', value: 'info' },
                      { label: 'Warning', value: 'warning' },
                      { label: 'Error', value: 'error' },
                      { label: 'Success', value: 'success' },
                      { label: 'Note', value: 'note' },
                    ],
                  },
                  {
                    name: 'title',
                    type: 'text',
                    admin: {
                      description: 'Optional title for the callout',
                    },
                  },
                  {
                    name: 'content',
                    type: 'textarea',
                    required: true,
                  },
                ],
                labels: {
                  singular: 'Callout',
                  plural: 'Callouts',
                },
                interfaceName: 'Callout',
              },
              {
                slug: 'imageGallery',
                fields: [
                  {
                    name: 'images',
                    type: 'array',
                    required: true,
                    minRows: 1,
                    fields: [
                      {
                        name: 'image',
                        type: 'upload',
                        relationTo: 'media',
                        required: true,
                      },
                      {
                        name: 'alt',
                        type: 'text',
                        required: true,
                      },
                      {
                        name: 'caption',
                        type: 'text',
                      },
                    ],
                  },
                  {
                    name: 'layout',
                    type: 'select',
                    defaultValue: 'grid',
                    options: [
                      { label: 'Grid', value: 'grid' },
                      { label: 'Carousel', value: 'carousel' },
                      { label: 'Masonry', value: 'masonry' },
                    ],
                  },
                  {
                    name: 'columns',
                    type: 'select',
                    defaultValue: '3',
                    options: [
                      { label: '2 Columns', value: '2' },
                      { label: '3 Columns', value: '3' },
                      { label: '4 Columns', value: '4' },
                    ],
                    admin: {
                      condition: (data, siblingData) => siblingData.layout === 'grid',
                    },
                  },
                ],
                labels: {
                  singular: 'Image Gallery',
                  plural: 'Image Galleries',
                },
                interfaceName: 'ImageGallery',
              },
            ],
          }),
        ],
      }),
      admin: {
        description: 'The main content of your blog post with rich text features',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Main image for the blog post',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'The author of this post',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'The main category for this post',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: 'Tags to help organize and find this post',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        description: 'Current status of the post',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'When this post was/will be published',
        condition: (data) => data.status === 'published',
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
            description: 'SEO title (if different from main title)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description for search engines',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
      ],
      admin: {
        description: 'SEO settings for this post',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        description: 'Estimated reading time in minutes',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data && data.content) {
              // Simple calculation: ~200 words per minute
              const wordCount = JSON.stringify(data.content).split(' ').length
              return Math.ceil(wordCount / 200)
            }
            return undefined
          },
        ],
      },
    },
    {
      name: 'cloudinaryImage',
      label: 'Cloudinary Image',
      type: 'text',
      admin: {
        description: 'Upload image to Cloudinary or paste URL here',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set publishedAt if status is published and no date is set
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
