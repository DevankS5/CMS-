import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function DebugPage() {
  const payload = await getPayload({ config })
  
  // Get the first published post
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    depth: 3, // Deeper to ensure all relationships are populated
    limit: 1,
  })
  
  const post = posts.docs[0]
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Post Content</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Post Title: {post?.title}</h2>
        <h3 className="text-md font-semibold mb-2">Content Structure:</h3>
        <pre className="text-xs overflow-auto max-h-96">
          {JSON.stringify(post?.content, null, 2)}
        </pre>
      </div>
    </div>
  )
}
