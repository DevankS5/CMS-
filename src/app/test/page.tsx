import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function TestPage() {
  const payload = await getPayload({ config })
  
  try {
    // Get all posts with full depth
    const posts = await payload.find({
      collection: 'posts',
      depth: 3,
      limit: 5,
    })
    
    // Get all media
    const media = await payload.find({
      collection: 'media',
      limit: 10,
    })
    
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Database Debug View</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Media Collection ({media.docs.length} items)</h2>
          <div className="grid gap-4">
            {media.docs.map((item: any) => (
              <div key={item.id} className="border p-4 rounded">
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>URL:</strong> {item.url}</p>
                <p><strong>Alt:</strong> {item.alt}</p>
                <p><strong>Caption:</strong> {item.caption || 'No caption'}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts Collection ({posts.docs.length} items)</h2>
          <div className="space-y-6">
            {posts.docs.map((post: any) => (
              <div key={post.id} className="border p-4 rounded">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p><strong>Status:</strong> {post.status}</p>
                <p><strong>Content Type:</strong> {typeof post.content}</p>
                
                {/* Show content structure */}
                <details className="mt-4">
                  <summary className="cursor-pointer font-semibold">Content Structure</summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-64">
                    {JSON.stringify(post.content, null, 2)}
                  </pre>
                </details>
                
                {/* Check for MediaImage blocks */}
                {post.content?.root?.children && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Blocks found in content:</h4>
                    <ul className="list-disc list-inside">
                      {post.content.root.children
                        .filter((child: any) => child.type === 'block')
                        .map((block: any, index: number) => (
                          <li key={index}>
                            <strong>{block.fields?.blockType || 'Unknown block'}</strong>
                            {block.fields?.blockType === 'mediaImage' && (
                              <div className="ml-4 text-sm">
                                <p>Media: {typeof block.fields.media === 'string' ? `ID: ${block.fields.media}` : 'Populated object'}</p>
                                <p>Size: {block.fields.size}</p>
                                <p>Alignment: {block.fields.alignment}</p>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p>{error.message}</p>
      </div>
    )
  }
}
