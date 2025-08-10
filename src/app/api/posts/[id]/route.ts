import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

function extractID(request: NextRequest): string | null {
  try {
    const url = new URL(request.url)
    const segments = url.pathname.split('/')
    return segments.pop() || null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const id = extractID(request)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const payload = await getPayload({ config })

  try {
    const post = await payload.findByID({
      collection: 'posts',
      id,
      depth: 5, // Very deep to ensure all relationships are populated
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  const id = extractID(request)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const payload = await getPayload({ config })

  try {
    const body = await request.json()

    // Update the post
    const updatedPost = await payload.update({
      collection: 'posts',
      id,
      data: body,
      depth: 5,
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const id = extractID(request)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const payload = await getPayload({ config })

  try {
    await payload.delete({
      collection: 'posts',
      id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
