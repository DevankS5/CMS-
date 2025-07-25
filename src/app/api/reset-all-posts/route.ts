import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Get all posts that might have problematic content
    const posts = await payload.find({
      collection: 'posts',
      limit: 100
    })

    let resetCount = 0
    
    for (const post of posts.docs) {
      try {
        // Reset content to basic structure if it causes issues
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            content: {
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: `${post.title} - Content has been reset due to compatibility issues. Please re-add your content using the basic rich text editor.`,
                        type: 'text',
                        version: 1
                      }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1
                  }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'root',
                version: 1
              }
            }
          }
        })
        resetCount++
      } catch (error) {
        console.error(`Failed to reset post ${post.id}:`, error)
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Reset ${resetCount} posts successfully`,
      totalPosts: posts.totalDocs 
    })

  } catch (error) {
    console.error('Bulk reset error:', error)
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'POST to this endpoint to reset all post content to basic structure',
    warning: 'This will reset ALL post content - use with caution!'
  })
}
