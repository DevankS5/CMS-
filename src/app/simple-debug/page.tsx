import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function SimpleDebugPage() {
  const payload = await getPayload({ config })
  
  try {
    // Simple query to see what we get
    const result = await payload.find({
      collection: 'posts',
      where: { id: { equals: '687fcdd873f17c55ef3d3e42' } }, // The ID from your logs
      depth: 3,
    })
    
    const post = result.docs[0]
    
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Simple Debug for Post: {post?.title}</h1>
        
        {/* Show raw content */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Raw Content Object:</h2>
          <div className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
            <pre>{JSON.stringify(post?.content, null, 2)}</pre>
          </div>
        </div>
        
        {/* Show blocks specifically */}
        {post?.content?.root?.children && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Found Blocks:</h2>
            {post.content.root.children
              .filter((child: any) => child.type === 'block')
              .map((block: any, index: number) => (
                <div key={index} className="border p-4 mb-4 rounded">
                  <h3 className="font-bold text-lg mb-2">Block {index + 1}: {block.fields?.blockType}</h3>
                  
                  {block.fields?.blockType === 'mediaImage' && (
                    <div className="space-y-2">
                      <p><strong>Media value:</strong> {JSON.stringify(block.fields.media)}</p>
                      <p><strong>Media type:</strong> {typeof block.fields.media}</p>
                      <p><strong>Size:</strong> {block.fields.size}</p>
                      <p><strong>Alignment:</strong> {block.fields.alignment}</p>
                      <p><strong>Caption:</strong> {block.fields.caption || 'None'}</p>
                      
                      {typeof block.fields.media === 'object' && block.fields.media?.url && (
                        <div className="mt-4">
                          <p className="font-bold text-green-600">✅ Media object is populated!</p>
                          <img 
                            src={block.fields.media.url} 
                            alt={block.fields.media.alt || 'Media image'} 
                            className="max-w-xs rounded border"
                          />
                        </div>
                      )}
                      
                      {typeof block.fields.media === 'string' && (
                        <p className="font-bold text-red-600">❌ Media is just an ID string: {block.fields.media}</p>
                      )}
                    </div>
                  )}
                  
                  <details className="mt-4">
                    <summary className="cursor-pointer font-semibold">Full Block Data</summary>
                    <pre className="text-xs bg-gray-50 p-2 mt-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(block, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
          </div>
        )}
        
        {/* Show using our RichTextRenderer */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Using RichTextRenderer:</h2>
          <div className="border p-4 rounded">
            {/* Note: We'd import RichTextRenderer here in a real scenario */}
            <p>Check the demo page at <a href="/demo" className="text-blue-500 underline">/demo</a> to see RichTextRenderer output</p>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : String(error)
    
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p>{errorMessage}</p>
        <pre className="bg-gray-100 p-4 rounded mt-4">{errorStack}</pre>
      </div>
    )
  }
}
