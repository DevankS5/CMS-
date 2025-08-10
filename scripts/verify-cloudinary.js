/**
 * Cloudinary Configuration Verification Script
 * Run this to check if your Cloudinary setup is working
 */

import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function verifyCloudinaryConfig() {
  console.log('🔍 Verifying Cloudinary Configuration...\n')

  // Check environment variables
  const hasCloudName = !!process.env.CLOUDINARY_CLOUD_NAME
  const hasApiKey = !!process.env.CLOUDINARY_API_KEY
  const hasApiSecret = !!process.env.CLOUDINARY_API_SECRET

  console.log('Environment Variables:')
  console.log(`✅ CLOUDINARY_CLOUD_NAME: ${hasCloudName ? '✓ Set' : '❌ Missing'}`)
  console.log(`✅ CLOUDINARY_API_KEY: ${hasApiKey ? '✓ Set' : '❌ Missing'}`)
  console.log(`✅ CLOUDINARY_API_SECRET: ${hasApiSecret ? '✓ Set' : '❌ Missing'}\n`)

  if (!hasCloudName || !hasApiKey || !hasApiSecret) {
    console.log('❌ Cloudinary is not properly configured.')
    console.log('📝 Please check your environment variables.\n')
    return false
  }

  try {
    // Test connection by getting account info
    console.log('🌐 Testing Cloudinary connection...')
    const result = await cloudinary.api.ping()
    console.log('✅ Cloudinary connection successful!')
    console.log(`📊 Status: ${result.status}\n`)

    // Get account usage info
    console.log('📈 Getting account information...')
    const usage = await cloudinary.api.usage()
    console.log(`📁 Resources: ${usage.resources || 0}`)
    console.log(`💾 Storage: ${Math.round(((usage.bytes || 0) / 1024 / 1024) * 100) / 100} MB`)
    console.log(`🔄 Transformations: ${usage.transformations || 0}\n`)

    return true
  } catch (error) {
    console.log('❌ Cloudinary connection failed!')
    console.log(`💥 Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`)
    return false
  }
}

async function main() {
  console.log('🚀 Cloudinary Configuration Checker\n')
  console.log('This script will verify your Cloudinary setup.\n')

  const isConfigured = await verifyCloudinaryConfig()

  if (isConfigured) {
    console.log('🎉 Cloudinary is properly configured!')
    console.log('✨ Your images will upload to Cloudinary in production.')
  } else {
    console.log('🔧 Please fix the configuration issues above.')
    console.log('📖 Check CLOUDINARY_SETUP.md for detailed instructions.')
  }

  console.log('\n📝 Next steps:')
  console.log('1. Set environment variables in Vercel dashboard')
  console.log('2. Redeploy your application')
  console.log('3. Test image uploads in production')
}

main().catch(console.error)
