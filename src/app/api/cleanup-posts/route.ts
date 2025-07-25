import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Get all posts
    const posts = await payload.find({
      collection: 'posts',
      limit: 1000,
    })

    let updatedCount = 0

    // Update each post to have simple content structure
    for (const post of posts.docs) {
      try {
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            ...post,
            content: {
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "This post content has been reset. Please edit to add your content.",
                        type: "text",
                        version: 1
                      }
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "paragraph",
                    version: 1
                  }
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "root",
                version: 1
              }
            }
          },
        })
        updatedCount++
      } catch (postError) {
        console.log(`Error updating post ${post.id}:`, postError)
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updatedCount} posts with clean content structure` 
    })
  } catch (error) {
    console.error('Error cleaning up posts:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
