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
          // Core features
          ...defaultFeatures,
          
          // Typography and formatting
          HeadingFeature({ 
            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          }),
          ParagraphFeature(),
          
          // Text styling
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          InlineCodeFeature(), // For inline `code` snippets
          
          // Structure and layout
          AlignFeature(),
          IndentFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          
          // Links
          LinkFeature({
            enabledCollections: ['posts', 'categories'],
          }),
          
          // Image uploads with cloud storage
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'alt',
                    type: 'text',
                    required: true,
                    admin: {
                      description: 'Alternative text for accessibility',
                    },
                  },
                  {
                    name: 'caption',
                    type: 'text',
                    admin: {
                      description: 'Optional image caption',
                    },
                  },
                ],
              },
            },
          }),
          
          // Advanced blocks
          BlocksFeature({
            blocks: [
              // Notion-style code block
              {
                slug: 'codeBlock',
                labels: {
                  singular: 'Code Block',
                  plural: 'Code Blocks',
                },
                interfaceName: 'NotionCodeBlock',
                fields: [
                  {
                    name: 'language',
                    type: 'select',
                    defaultValue: 'javascript',
                    options: [
                      { label: 'JavaScript', value: 'javascript' },
                      { label: 'TypeScript', value: 'typescript' },
                      { label: 'React JSX', value: 'jsx' },
                      { label: 'React TSX', value: 'tsx' },
                      { label: 'Python', value: 'python' },
                      { label: 'Java', value: 'java' },
                      { label: 'C#', value: 'csharp' },
                      { label: 'C++', value: 'cpp' },
                      { label: 'C', value: 'c' },
                      { label: 'PHP', value: 'php' },
                      { label: 'Ruby', value: 'ruby' },
                      { label: 'Go', value: 'go' },
                      { label: 'Rust', value: 'rust' },
                      { label: 'Swift', value: 'swift' },
                      { label: 'Kotlin', value: 'kotlin' },
                      { label: 'HTML', value: 'html' },
                      { label: 'CSS', value: 'css' },
                      { label: 'SCSS/Sass', value: 'scss' },
                      { label: 'SQL', value: 'sql' },
                      { label: 'GraphQL', value: 'graphql' },
                      { label: 'JSON', value: 'json' },
                      { label: 'YAML', value: 'yaml' },
                      { label: 'XML', value: 'xml' },
                      { label: 'Markdown', value: 'markdown' },
                      { label: 'Bash/Shell', value: 'bash' },
                      { label: 'PowerShell', value: 'powershell' },
                      { label: 'Docker', value: 'dockerfile' },
                      { label: 'Nginx', value: 'nginx' },
                      { label: 'Apache', value: 'apache' },
                      { label: 'Plain Text', value: 'text' },
                    ],
                    admin: {
                      description: 'Programming language for syntax highlighting',
                    },
                  },
                  {
                    name: 'code',
                    type: 'code',
                    required: true,
                    admin: {
                      description: 'Your code snippet',
                      language: 'javascript', // Default language for the admin editor
                    },
                  },
                  {
                    name: 'filename',
                    type: 'text',
                    admin: {
                      description: 'Optional filename to display (e.g., "app.js", "index.html")',
                    },
                  },
                  {
                    name: 'showLineNumbers',
                    type: 'checkbox',
                    defaultValue: true,
                    admin: {
                      description: 'Show line numbers in the code block',
                    },
                  },
                  {
                    name: 'highlightLines',
                    type: 'text',
                    admin: {
                      description: 'Comma-separated line numbers to highlight (e.g., "1,3,5-7")',
                    },
                  },
                  {
                    name: 'theme',
                    type: 'select',
                    defaultValue: 'dark',
                    options: [
                      { label: 'Dark Theme', value: 'dark' },
                      { label: 'Light Theme', value: 'light' },
                      { label: 'VS Code Dark', value: 'vscode-dark' },
                      { label: 'GitHub Light', value: 'github-light' },
                      { label: 'Dracula', value: 'dracula' },
                    ],
                    admin: {
                      description: 'Color theme for the code block',
                    },
                  },
                ],
              },
              
              // Enhanced Media Image block
              {
                slug: 'mediaImage',
                labels: {
                  singular: 'Media Image',
                  plural: 'Media Images',
                },
                interfaceName: 'MediaImageBlock',
                fields: [
                  {
                    name: 'media',
                    type: 'relationship',
                    relationTo: 'media',
                    required: true,
                    admin: {
                      description: 'Select from existing media library',
                    },
                  },
                  {
                    name: 'size',
                    type: 'select',
                    defaultValue: 'medium',
                    options: [
                      { label: 'Small (400px)', value: 'small' },
                      { label: 'Medium (600px)', value: 'medium' },
                      { label: 'Large (800px)', value: 'large' },
                      { label: 'Extra Large (1000px)', value: 'xl' },
                      { label: 'Full Width', value: 'full' },
                    ],
                  },
                  {
                    name: 'alignment',
                    type: 'select',
                    defaultValue: 'center',
                    options: [
                      { label: 'Left', value: 'left' },
                      { label: 'Center', value: 'center' },
                      { label: 'Right', value: 'right' },
                    ],
                  },
                  {
                    name: 'caption',
                    type: 'text',
                    admin: {
                      description: 'Optional caption override (uses media caption if empty)',
                    },
                  },
                  {
                    name: 'rounded',
                    type: 'checkbox',
                    defaultValue: true,
                    admin: {
                      description: 'Apply rounded corners to the image',
                    },
                  },
                  {
                    name: 'shadow',
                    type: 'checkbox',
                    defaultValue: true,
                    admin: {
                      description: 'Add shadow effect to the image',
                    },
                  },
                ],
              },
              
              // Notion-style callout/alert
              {
                slug: 'callout',
                labels: {
                  singular: 'Callout',
                  plural: 'Callouts',
                },
                interfaceName: 'CalloutBlock',
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    defaultValue: 'info',
                    options: [
                      { label: '💡 Info', value: 'info' },
                      { label: '⚠️ Warning', value: 'warning' },
                      { label: '❌ Error', value: 'error' },
                      { label: '✅ Success', value: 'success' },
                      { label: '📝 Note', value: 'note' },
                      { label: '💭 Tip', value: 'tip' },
                      { label: '🔥 Important', value: 'important' },
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
                    admin: {
                      description: 'The main content of the callout',
                    },
                  },
                  {
                    name: 'icon',
                    type: 'text',
                    admin: {
                      description: 'Custom emoji or icon (overrides default)',
                    },
                  },
                ],
              },
              
              // Quote/testimonial block
              {
                slug: 'quote',
                labels: {
                  singular: 'Quote',
                  plural: 'Quotes',
                },
                interfaceName: 'QuoteBlock',
                fields: [
                  {
                    name: 'quote',
                    type: 'textarea',
                    required: true,
                    admin: {
                      description: 'The quote text',
                    },
                  },
                  {
                    name: 'author',
                    type: 'text',
                    admin: {
                      description: 'Quote author',
                    },
                  },
                  {
                    name: 'role',
                    type: 'text',
                    admin: {
                      description: 'Author\'s role or title',
                    },
                  },
                  {
                    name: 'company',
                    type: 'text',
                    admin: {
                      description: 'Company or organization',
                    },
                  },
                  {
                    name: 'avatar',
                    type: 'relationship',
                    relationTo: 'media',
                    admin: {
                      description: 'Optional author avatar',
                    },
                  },
                ],
              },
              
              // Embed block for videos, tweets, etc.
              {
                slug: 'embed',
                labels: {
                  singular: 'Embed',
                  plural: 'Embeds',
                },
                interfaceName: 'EmbedBlock',
                fields: [
                  {
                    name: 'url',
                    type: 'text',
                    required: true,
                    admin: {
                      description: 'URL to embed (YouTube, Vimeo, Twitter, CodePen, etc.)',
                    },
                  },
                  {
                    name: 'title',
                    type: 'text',
                    admin: {
                      description: 'Optional title for the embed',
                    },
                  },
                  {
                    name: 'aspectRatio',
                    type: 'select',
                    defaultValue: '16:9',
                    options: [
                      { label: '16:9 (Widescreen)', value: '16:9' },
                      { label: '4:3 (Standard)', value: '4:3' },
                      { label: '1:1 (Square)', value: '1:1' },
                      { label: '21:9 (Ultrawide)', value: '21:9' },
                    ],
                  },
                ],
              },
            ],
          }),
        ],
      }),
      admin: {
        description: 'Rich content with images, code blocks, and interactive elements',
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
