import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary - supports both CLOUDINARY_URL and individual env vars
if (process.env.CLOUDINARY_URL) {
  // If CLOUDINARY_URL is set, use it (format: cloudinary://api_key:api_secret@cloud_name)
  cloudinary.config(process.env.CLOUDINARY_URL)
} else {
  // Fallback to individual environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    const hasCloudinaryUrl = !!process.env.CLOUDINARY_URL
    const hasIndividualVars = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
    
    if (!hasCloudinaryUrl && !hasIndividualVars) {
      console.error('Cloudinary not configured. Set either CLOUDINARY_URL or individual env vars.')
      return NextResponse.json(
        { 
          error: 'Cloudinary not configured', 
          details: 'Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET'
        },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: 'payload-cms',
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error)
              reject(error)
            } else {
              console.log('Cloudinary upload success:', result?.secure_url)
              resolve(result)
            }
          }
        )
        .end(buffer)
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload route error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Upload failed', details: errorMessage },
      { status: 500 },
    )
  }
}
