import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function GET(request: NextRequest) {
  const payload = await getPayload({ config })
  
  try {
    // First, let's create a test media entry if none exists
    const existingMedia = await payload.find({
      collection: 'media',
      limit: 1,
    })
    
    let mediaId = existingMedia.docs[0]?.id
    
    if (!mediaId) {
      // Create a test media entry
      const newMedia = await payload.create({
        collection: 'media',
        data: {
          url: 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Test+Image',
          alt: 'Test image for MediaImage block',
          caption: 'This is a test image created for debugging MediaImage blocks',
        }
      })
      mediaId = newMedia.id
    }
    
    // Now let's test creating a post with a MediaImage block
    const testPost = await payload.create({
      collection: 'posts',
      data: {
        title: 'Test MediaImage Post',
        slug: 'test-mediaimage-post',
        excerpt: 'Testing MediaImage block functionality',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    format: 0,
                    style: '',
                    mode: 'normal',
                    detail: 0,
                    text: 'This is a test post with a MediaImage block below:',
                    version: 1
                  }
                ]
              },
              {
                type: 'block',
                format: '',
                version: 1,
                fields: {
                  blockType: 'mediaImage',
                  media: mediaId,
                  size: 'medium',
                  alignment: 'center',
                  caption: 'Test caption override'
                }
              }
            ]
          }
        },
        author: '687c9d434be4d9880647e0f6', // Use existing user ID from your logs
        category: '687ca42b9584250f29a8a164', // Use existing category ID from your logs
        status: 'published',
        publishedAt: new Date().toISOString(),
      }
    })
    
    // Now fetch it back with population
    const fetchedPost = await payload.findByID({
      collection: 'posts',
      id: testPost.id,
      depth: 3,
    })
    
    return NextResponse.json({
      message: 'Test post created and fetched',
      mediaId,
      testPost: fetchedPost,
      contentStructure: fetchedPost.content
    })
    
  } catch (error) {
    console.error('Error in test:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
