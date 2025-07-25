import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Get the first user to use as author
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })
    
    if (users.docs.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'No users found. Please create a user first.' 
      }, { status: 400 })
    }
    
    // Create a test post with rich content including an image
    const testPost = await payload.create({
      collection: 'posts',
      data: {
        title: 'Rich Text Test with Images',
        slug: 'rich-text-test-images',
        excerpt: 'Testing the rich text editor with image capabilities',
        author: users.docs[0].id,
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
                    text: "This is a test post with ",
                    type: "text",
                    version: 1
                  },
                  {
                    detail: 0,
                    format: 1,
                    mode: "normal",
                    style: "",
                    text: "bold text",
                    type: "text",
                    version: 1
                  },
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: " and ",
                    type: "text",
                    version: 1
                  },
                  {
                    detail: 0,
                    format: 2,
                    mode: "normal",
                    style: "",
                    text: "italic text",
                    type: "text",
                    version: 1
                  },
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: ".",
                    type: "text",
                    version: 1
                  }
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "You can also add images directly in the content using the image upload button in the toolbar.",
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
        },
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Test post created successfully with rich text content',
      post: testPost
    })
  } catch (error) {
    console.error('Error creating test post:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
