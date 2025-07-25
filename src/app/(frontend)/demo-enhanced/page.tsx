import { getPayload } from 'payload'
import Link from 'next/link'
import config from '../../../payload.config'
import { RichTextRenderer } from '../../../components/RichTextRenderer'

export default async function DemoPage() {
  const payload = await getPayload({ config })

  // Fetch the latest published posts to demonstrate rich text rendering
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 3,
    depth: 3, // Ensure relationships are populated
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Enhanced Rich Text Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcase of Notion-like rich text features including code blocks, 
            callouts, media images, quotes, embeds, and more.
          </p>
        </div>

        {/* Feature Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            ✨ Available Block Types
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💻</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Code Blocks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">25+ languages with syntax highlighting</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🖼️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Media Images</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Responsive images from media library</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Callouts</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">7 types: info, warning, error, success, etc.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Quotes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">With author attribution and avatars</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📹</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Embeds</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">YouTube, Vimeo, CodePen, and more</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🖼️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Image Galleries</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Grid, carousel, and masonry layouts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Panel Link */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🎨 Try the Enhanced Editor
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                Create posts with all these rich text features in the admin panel.
              </p>
            </div>
            <Link
              href="/admin/collections/posts"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Admin Panel →
            </Link>
          </div>
        </div>

        {/* Posts Display */}
        {posts.length > 0 ? (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              📚 Published Posts
            </h2>
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {post.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    {post.author && (
                      <span>👤 By {typeof post.author === 'object' ? post.author.email : post.author}</span>
                    )}
                    {post.category && (
                      <span>📂 {typeof post.category === 'object' ? post.category.name : post.category}</span>
                    )}
                    {post.publishedAt && (
                      <span>📅 {new Date(post.publishedAt).toLocaleDateString()}</span>
                    )}
                    {post.readingTime && (
                      <span>⏱️ {post.readingTime} min read</span>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-8">
                  <RichTextRenderer content={post.content} />
                </div>

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="px-8 pb-8">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: any) => (
                        <span
                          key={typeof tag === 'object' ? tag.id : tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          #{typeof tag === 'object' ? tag.name : tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first post to see the rich text features in action.
            </p>
            <Link
              href="/admin/collections/posts/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create First Post
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <span>Powered by</span>
            <span className="font-semibold">Payload CMS</span>
            <span>with</span>
            <span className="font-semibold">Enhanced Rich Text</span>
          </div>
        </div>
      </div>
    </div>
  )
}
