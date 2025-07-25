'use client'
import React, { useState } from 'react'

const CloudinaryUpload = (props: any) => {
  const { value, setValue } = props
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/cloudinary-upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.secure_url && setValue) {
        setValue(data.secure_url)
      } else {
        setError('Upload failed')
      }
    } catch (err) {
      setError('Upload failed')
    }
    setUploading(false)
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <div>Uploading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {value && typeof value === 'string' && (
        <img src={value} alt="Cloudinary" style={{ maxWidth: 200, marginTop: 10 }} />
      )}
    </div>
  )
}

export default CloudinaryUpload
