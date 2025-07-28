import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const post = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      depth: 5, // Very deep to ensure all relationships are populated
      limit: 1,
    })

    if (!post.docs.length) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Manually populate media relationships in content blocks if needed
    const postData = post.docs[0]
    if (postData.content && postData.content.root && postData.content.root.children) {
      for (const child of postData.content.root.children) {
        if (
          child.type === 'block' &&
          child.fields?.blockType === 'mediaImage' &&
          child.fields?.media
        ) {
          if (typeof child.fields.media === 'string') {
            // Fetch the media object
            const mediaResult = await payload.findByID({
              collection: 'media',
              id: child.fields.media,
            })
            child.fields.media = mediaResult
          }
        }
      }
    }

    return NextResponse.json(postData)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
