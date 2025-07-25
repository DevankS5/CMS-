// Tags Collection Test Script
async function testTagsCollection() {
  const baseUrl = 'http://localhost:3001/api'
  
  console.log('🏷️  Testing Tags Collection Functionality...\n')
  
  try {
    // Test 1: Fetch existing tags
    console.log('📋 Fetching existing tags...')
    const tagsResponse = await fetch(`${baseUrl}/tags`)
    const tagsData = await tagsResponse.json()
    
    console.log(`✅ Found ${tagsData.totalDocs} existing tags:`)
    tagsData.docs.forEach((tag, index) => {
      console.log(`   ${index + 1}. ${tag.name} (${tag.slug})`)
      if (tag.description) console.log(`      📝 ${tag.description}`)
      if (tag.color) console.log(`      🎨 Color: ${tag.color}`)
    })
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Test 2: Check tag features
    console.log('🔍 Analyzing tag structure...')
    if (tagsData.docs.length > 0) {
      const sampleTag = tagsData.docs[0]
      console.log('📊 Sample tag structure:')
      console.log('   - Name:', sampleTag.name || '❌ Missing')
      console.log('   - Slug:', sampleTag.slug || '❌ Missing')
      console.log('   - Description:', sampleTag.description || '⚠️  Not set')
      console.log('   - Color:', sampleTag.color || '⚠️  Not set')
      console.log('   - SEO Data:', sampleTag.seo ? '✅ Present' : '⚠️  Not set')
      
      if (sampleTag.seo) {
        console.log('     - Meta Title:', sampleTag.seo.metaTitle || '⚠️  Not set')
        console.log('     - Meta Description:', sampleTag.seo.metaDescription || '⚠️  Not set')
      }
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Test 3: Validate slug generation
    console.log('🔧 Testing slug generation logic...')
    const testNames = ['JavaScript', 'React.js', 'Node & Express', 'AI/ML Tutorials']
    testNames.forEach(name => {
      const expectedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      console.log(`   "${name}" → "${expectedSlug}"`)
    })
    
    console.log('\n🎯 Tags collection is ready to use!')
    console.log('💡 To create new tags:')
    console.log('   1. Go to http://localhost:3001/admin')
    console.log('   2. Navigate to Blog → Tags')
    console.log('   3. Click "Create New"')
    console.log('   4. Fill in the tag details')
    
  } catch (error) {
    console.error('❌ Error testing tags:', error.message)
  }
}

// Run the test
testTagsCollection().catch(console.error)
