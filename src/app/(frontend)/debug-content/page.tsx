import { getPayload } from 'payload'
import config from '@payload-config'

export default async function DebugContentPage() {
  try {
    const payload = await getPayload({ config })
    
    // Get all posts to check their content structure
    const posts = await payload.find({
      collection: 'posts',
      limit: 10,
      depth: 0,
    })

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Content Debug Page</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Posts in Database ({posts.totalDocs} total):</h2>
          
          {posts.docs.map((post: any) => (
            <div key={post.id} className="border p-4 mb-4 rounded">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">ID: {post.id}</p>
              
              {/* Show content structure */}
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600">View Content Structure</summary>
                <pre className="mt-2 p-2 bg-gray-100 text-xs overflow-auto max-h-40">
                  {JSON.stringify(post.content, null, 2)}
                </pre>
              </details>
              
              {/* Quick fix button */}
              <div className="mt-2">
                <a 
                  href={`/admin/collections/posts/${post.id}`}
                  className="text-blue-600 hover:underline text-sm"
                  target="_blank"
                >
                  Edit in Admin →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">Troubleshooting Tips:</h3>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>If you see "blockReferences" errors, try creating a new post instead of editing existing ones</li>
            <li>Existing posts may have old content structure that conflicts with new block types</li>
            <li>Consider clearing the content field and re-adding content with new blocks</li>
            <li>The error typically occurs when Lexical can't parse the existing rich text structure</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <a 
            href="/admin/collections/posts/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create New Post (Recommended)
          </a>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Debug Error</h1>
        <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    )
  }
}
