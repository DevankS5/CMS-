import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Read file as buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
        .end(buffer)
    })
    return NextResponse.json(result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Cloudinary upload failed', details: errorMessage },
      { status: 500 },
    )
  }
}
