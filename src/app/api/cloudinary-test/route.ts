import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function GET() {
  try {
    // Configure Cloudinary
    if (process.env.CLOUDINARY_URL) {
      cloudinary.config(process.env.CLOUDINARY_URL)
    } else {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })
    }

    // Test Cloudinary connection
    const result = await cloudinary.api.ping()
    
    return NextResponse.json({ 
      status: 'SUCCESS',
      message: 'Cloudinary API is connected and working',
      cloudinary_ping: result,
      env_check: {
        cloudinary_url_set: !!process.env.CLOUDINARY_URL,
        cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not Set',
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not Set',
      }
    })
  } catch (error) {
    console.error('Cloudinary connection test failed:', error)
    return NextResponse.json(
      { 
        status: 'ERROR',
        message: 'Cloudinary API connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        env_check: {
          cloudinary_url_set: !!process.env.CLOUDINARY_URL,
          cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not Set',
          cloudinary_api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
          cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not Set',
        }
      },
      { status: 500 }
    )
  }
}
