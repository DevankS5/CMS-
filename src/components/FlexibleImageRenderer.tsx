import React from 'react'
import Image from 'next/image'

interface FlexibleImageRendererProps {
  src: string
  alt?: string
  width?: number
  height?: number
  caption?: string
  className?: string
}

export const FlexibleImageRenderer: React.FC<FlexibleImageRendererProps> = ({
  src,
  alt = '',
  width = 800,
  height = 400,
  caption,
  className = '',
}) => {
  // Check if it's an external image
  const isExternal = src.startsWith('http')

  // List of known external domains that might cause Next.js issues
  const problematicDomains = ['pexels.com', 'unsplash.com', 'pixabay.com', 'freepik.com']

  const hasDomainIssues = problematicDomains.some((domain) => src.includes(domain))

  // Use regular img tag for problematic external images
  if (isExternal && hasDomainIssues) {
    return (
      <div className={`my-6 ${className}`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg shadow-md max-w-full h-auto"
          loading="lazy"
          onError={(e) => {
            console.error('Image failed to load:', src)
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        {caption && <p className="text-sm text-gray-600 mt-2 text-center italic">{caption}</p>}
      </div>
    )
  }

  // Use Next.js Image for local images and trusted external sources
  return (
    <div className={`my-6 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg shadow-md"
        unoptimized={isExternal}
        onError={(e) => {
          console.error('Next.js Image failed to load:', src)
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
      {caption && <p className="text-sm text-gray-600 mt-2 text-center italic">{caption}</p>}
    </div>
  )
}

export default FlexibleImageRenderer
