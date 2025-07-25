import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function GET(request: NextRequest) {
  const payload = await getPayload({ config })
  
  try {
    // Get all media first
    const media = await payload.find({
      collection: 'media',
      limit: 10,
    })
    
    // Get the first post with depth to see content structure
    const posts = await payload.find({
      collection: 'posts',
      depth: 3,
      limit: 1,
    })
    
    return NextResponse.json({
      media: media.docs,
      post: posts.docs[0],
      contentStructure: posts.docs[0]?.content,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
