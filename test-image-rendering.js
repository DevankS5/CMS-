// Test script to verify image rendering works correctly
async function testImageRendering() {
  const baseUrl = 'http://localhost:3000/api'
  
  console.log('Testing image rendering functionality...\n')
  
  // Test 1: Check if media API is accessible
  try {
    const mediaResponse = await fetch(`${baseUrl}/media?limit=5`)
    const mediaData = await mediaResponse.json()
    console.log('✅ Media API accessible')
    console.log(`📊 Found ${mediaData.totalDocs} media items`)
    
    if (mediaData.docs.length > 0) {
      console.log('📷 Sample media items:')
      mediaData.docs.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.alt || 'No alt text'} - ${item.url}`)
      })
    }
  } catch (error) {
    console.error('❌ Media API not accessible:', error.message)
    return
  }
  
  console.log('\n' + '='.repeat(50) + '\n')
  
  // Test 2: Check posts with embedded images
  try {
    const postsResponse = await fetch(`${baseUrl}/posts?depth=3`)
    const postsData = await postsResponse.json()
    console.log('✅ Posts API accessible')
    console.log(`📰 Found ${postsData.totalDocs} posts`)
    
    let postsWithImages = 0
    postsData.docs.forEach((post, index) => {
      if (post.content && post.content.root && post.content.root.children) {
        const hasImages = JSON.stringify(post.content).includes('"type":"upload"')
        if (hasImages) {
          postsWithImages++
          console.log(`📷 Post "${post.title}" contains embedded images`)
          
          // Extract image info
          const findUploads = (obj) => {
            if (Array.isArray(obj)) {
              return obj.flatMap(findUploads)
            }
            if (obj && typeof obj === 'object') {
              if (obj.type === 'upload' && obj.value) {
                return [obj.value]
              }
              return Object.values(obj).flatMap(findUploads)
            }
            return []
          }
          
          const uploads = findUploads(post.content)
          uploads.forEach((upload, imgIndex) => {
            console.log(`   Image ${imgIndex + 1}: ${upload.url} (Alt: ${upload.alt || 'None'})`)
          })
        }
      }
    })
    
    console.log(`📊 Posts with embedded images: ${postsWithImages}`)
    
  } catch (error) {
    console.error('❌ Posts API not accessible:', error.message)
  }
  
  console.log('\n' + '='.repeat(50) + '\n')
  
  // Test 3: Check if local media files are accessible
  try {
    const testLocalFile = '/media/WhatsApp%20Image%202025-07-17%20at%2000.41.26_8ccaa5e1.jpg'
    const fileResponse = await fetch(`http://localhost:3000${testLocalFile}`)
    
    if (fileResponse.ok) {
      console.log('✅ Local media files are accessible via HTTP')
      console.log(`📁 Test file size: ${fileResponse.headers.get('content-length')} bytes`)
    } else {
      console.log('⚠️  Local media file not accessible:', fileResponse.status)
    }
  } catch (error) {
    console.log('⚠️  Could not test local file access:', error.message)
  }
  
  console.log('\n🎯 Test complete! Visit http://localhost:3000/demo to see the frontend rendering.')
}

// Run the test
testImageRendering().catch(console.error)
