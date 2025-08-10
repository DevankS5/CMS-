import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'

function extractSlug(request: NextRequest): string | null {
  try {
    return request.nextUrl.pathname.split('/').pop() || null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const slug = extractSlug(request)
  if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
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
    if (postData.content?.root?.children) {
      for (const child of postData.content.root.children as any[]) {
        if (child && child.type === 'block' && child.fields) {
          const fields = child.fields as { blockType?: string; media?: any }
          if (fields.blockType === 'mediaImage' && fields.media) {
            if (typeof fields.media === 'string') {
              try {
                const mediaResult = await payload.findByID({
                  collection: 'media',
                  id: fields.media,
                })
                fields.media = mediaResult
              } catch (e) {
                console.warn('Failed to populate media block', e)
              }
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
