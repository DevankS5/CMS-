import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function GET(_request: NextRequest) {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    depth: 3, // Increased depth to ensure block relationships are populated
    sort: '-publishedAt',
  })
  return NextResponse.json(posts)
}
