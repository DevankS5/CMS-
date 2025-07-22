export default function UploadTest() {
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    if (!file) {
      alert('Please select a file')
      return
    }

    console.log('Uploading file:', file.name)

    try {
      // Test 1: Simple upload test
      const testResponse = await fetch('/api/test-upload', {
        method: 'POST',
        body: formData,
      })
      const testResult = await testResponse.json()
      console.log('Test upload result:', testResult)

      // Test 2: Cloudinary upload
      const cloudinaryResponse = await fetch('/api/cloudinary-upload', {
        method: 'POST',
        body: formData,
      })
      const cloudinaryResult = await cloudinaryResponse.json()
      console.log('Cloudinary upload result:', cloudinaryResult)

      if (cloudinaryResponse.ok) {
        alert('Upload successful! Check console for details.')
      } else {
        alert('Upload failed: ' + cloudinaryResult.error)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload error: ' + error)
    }
  }

  const checkAPI = async () => {
    try {
      const response = await fetch('/api/cloudinary-test')
      const result = await response.json()
      console.log('API Check Result:', result)
      alert('Check console for API status')
    } catch (error) {
      console.error('API check error:', error)
      alert('API check failed: ' + error)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload Test Page</h1>

      <button
        onClick={checkAPI}
        style={{ margin: '10px', padding: '10px', background: 'blue', color: 'white' }}
      >
        Check API Status
      </button>

      <form onSubmit={handleUpload} style={{ margin: '20px 0' }}>
        <input type="file" name="file" accept="image/*" required />
        <button
          type="submit"
          style={{ margin: '10px', padding: '10px', background: 'green', color: 'white' }}
        >
          Upload Image
        </button>
      </form>

      <p>Open browser console (F12) to see detailed logs.</p>
    </div>
  )
}
