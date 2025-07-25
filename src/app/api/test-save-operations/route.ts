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
    
    // Create a test post
    const testPost = await payload.create({
      collection: 'posts',
      data: {
        title: 'API Test Post - ' + new Date().toISOString(),
        slug: 'api-test-post-' + Date.now(),
        excerpt: 'Testing that save operations work correctly',
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
                    text: "This post was created to test that save operations work correctly after fixing the method not allowed error.",
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

    // Now test updating the post
    const updatedPost = await payload.update({
      collection: 'posts',
      id: testPost.id,
      data: {
        ...testPost,
        title: testPost.title + ' (Updated)',
        excerpt: 'Testing that PATCH operations work correctly',
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully created and updated test post',
      createdPost: testPost,
      updatedPost: updatedPost
    })
  } catch (error) {
    console.error('Error testing post operations:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
