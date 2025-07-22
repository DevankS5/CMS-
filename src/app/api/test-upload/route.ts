import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const hasCloudinaryUrl = !!process.env.CLOUDINARY_URL
  const hasIndividualVars = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )

  return NextResponse.json({
    message: 'Upload API is working',
    env: {
      cloudinary_configured: hasCloudinaryUrl || hasIndividualVars,
      cloudinary_url_set: hasCloudinaryUrl,
      cloudinary_individual_vars_set: hasIndividualVars,
      cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not Set',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'File received successfully',
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('Test upload error:', error)
    return NextResponse.json(
      {
        error: 'Test upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
