import { getPayload } from 'payload'
import React from 'react'
import RichTextRenderer from '@/components/RichTextRenderer'
import Link from 'next/link'

import config from '@/payload.config'

export default async function DemoPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // Fetch the latest published posts to demonstrate rich text rendering
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Rich Text Demo
          </h1>
          <p className="text-xl text-gray-600">
            Demonstrating enhanced rich text features with code blocks, callouts, and image galleries
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Features Available in Your Editor:</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-blue-600">📝 Rich Text Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Bold</strong>, <em>italic</em>, <u>underline</u> text</li>
                <li>• <code className="bg-gray-100 px-1 py-0.5 rounded">Inline code</code></li>
                <li>• Headers (H1-H6)</li>
                <li>• Lists (ordered & unordered)</li>
                <li>• Links & blockquotes</li>
                <li>• Text alignment & indentation</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-green-600">🖼️ Media Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Drag & drop image upload</li>
                <li>• Image galleries with lightbox</li>
                <li>• Cloudinary integration</li>
                <li>• Multiple gallery layouts</li>
                <li>• Image captions & alt text</li>
                <li>• Responsive image sizing</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-purple-600">💻 Code Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Syntax highlighting</li>
                <li>• 20+ programming languages</li>
                <li>• Line numbers & highlighting</li>
                <li>• Filename display</li>
                <li>• Copy code button</li>
                <li>• Dark theme styling</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-orange-600">💡 Special Blocks</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Info, warning, error callouts</li>
                <li>• Success & note boxes</li>
                <li>• Custom titles</li>
                <li>• Nested rich text content</li>
                <li>• Color-coded styling</li>
                <li>• Icon indicators</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-2">🚀 How to Use</h3>
            <p className="text-blue-700">
              1. Go to the admin panel and create/edit a post<br/>
              2. In the content editor, use the &ldquo;/&rdquo; command to insert blocks<br/>
              3. Type &ldquo;/&rdquo; followed by &ldquo;code&rdquo;, &ldquo;callout&rdquo;, or &ldquo;gallery&rdquo; to add special content<br/>
              4. Use the toolbar for basic formatting and image uploads
            </p>
          </div>
        </div>

        {posts.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Latest Blog Posts</h2>
            <div className="space-y-8">
              {posts.map((post: any) => (
                <article key={post.id} className="border-b pb-8 last:border-b-0">
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  {post.content && (
                    <RichTextRenderer content={post.content} />
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Posts Yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first blog post in the admin panel to see the rich text features in action!
            </p>
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Admin Panel
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
