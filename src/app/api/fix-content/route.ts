import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const { postId, action } = await request.json()
    const payload = await getPayload({ config })

    if (action === 'reset-content') {
      // Reset the content field to a basic structure
      await payload.update({
        collection: 'posts',
        id: postId,
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
                      text: 'Content has been reset. You can now add new blocks safely.',
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

      return NextResponse.json({ 
        success: true, 
        message: 'Content reset successfully' 
      })
    }

    if (action === 'get-content') {
      const post = await payload.findByID({
        collection: 'posts',
        id: postId,
        depth: 0
      })

      return NextResponse.json({ 
        success: true, 
        content: post.content 
      })
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid action' 
    }, { status: 400 })

  } catch (error) {
    console.error('Content fix error:', error)
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST with { postId, action } to fix content issues' 
  })
}
