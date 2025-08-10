import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'

interface ContentChild {
  type?: string
  fields?: {
    blockType?: string
    media?: string | Record<string, unknown> | { [key: string]: unknown }
  }
}

interface ContentRoot {
  children?: ContentChild[]
}

interface PostContent {
  root?: ContentRoot
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
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
    if (postData.content && typeof postData.content === 'object' && 'root' in postData.content) {
      const content = postData.content as PostContent
      if (content.root && content.root.children) {
        for (const child of content.root.children) {
          if (
            child.type === 'block' &&
            child.fields &&
            'blockType' in child.fields &&
            child.fields.blockType === 'mediaImage' &&
            'media' in child.fields &&
            child.fields.media
          ) {
            if (typeof child.fields.media === 'string') {
              // Fetch the media object
              const mediaResult = await payload.findByID({
                collection: 'media',
                id: child.fields.media,
              })
              child.fields.media = mediaResult as unknown as Record<string, unknown>
            }
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
