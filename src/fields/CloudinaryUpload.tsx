'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface CloudinaryUploadProps {
  value?: string
  setValue?: (value: string) => void
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = (props) => {
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
    } catch (_err) {
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
        <Image src={value} alt="Cloudinary" width={200} height={150} style={{ marginTop: 10 }} />
      )}
    </div>
  )
}

export default CloudinaryUpload
