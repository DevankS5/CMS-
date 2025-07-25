'use client'

import React from 'react'
import Image from 'next/image'

interface Media {
  id: string
  url: string
  alt: string
  caption?: string
}

interface MediaImageBlockProps {
  media: string | Media
  size?: 'small' | 'medium' | 'large' | 'xl' | 'full'
  alignment?: 'left' | 'center' | 'right'
  caption?: string
  rounded?: boolean
  shadow?: boolean
}

export const MediaImageBlock: React.FC<MediaImageBlockProps> = ({
  media,
  size = 'medium',
  alignment = 'center',
  caption,
  rounded = true,
  shadow = true,
}) => {
  // Handle case where media is just an ID string
  if (typeof media === 'string') {
    console.log('MediaImageBlock: Media is string ID, cannot render without populated data', media)
    return (
      <div className="my-8 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        <p>Media not loaded (ID: {media})</p>
        <p className="text-sm">Note: Media relationships need to be populated server-side</p>
      </div>
    )
  }

  // Handle case where media object doesn't have URL
  if (!media || !media.url) {
    console.log('MediaImageBlock: Media object missing or no URL', media)
    return (
      <div className="my-8 p-4 border-2 border-dashed border-red-300 rounded-lg text-center text-red-500">
        <p>Invalid media object</p>
      </div>
    )
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'max-w-sm' // 384px
      case 'large':
        return 'max-w-4xl' // 896px
      case 'xl':
        return 'max-w-5xl' // 1024px
      case 'full':
        return 'w-full'
      default: // medium
        return 'max-w-2xl' // 672px
    }
  }

  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'mr-auto'
      case 'right':
        return 'ml-auto'
      default: // center
        return 'mx-auto'
    }
  }

  const displayCaption = caption || media.caption

  return (
    <figure className={`my-8 ${getSizeClasses()} ${getAlignmentClasses()}`}>
      <div className={`relative overflow-hidden ${rounded ? 'rounded-xl' : ''} ${shadow ? 'shadow-lg hover:shadow-xl' : ''} transition-shadow duration-300`}>
        <Image
          src={media.url}
          alt={media.alt || ''}
          width={1000}
          height={750}
          className="w-full h-auto object-cover"
          sizes={`
            (max-width: 640px) 100vw,
            (max-width: 768px) 80vw,
            ${size === 'small' ? '384px' : 
              size === 'medium' ? '672px' : 
              size === 'large' ? '896px' : 
              size === 'xl' ? '1024px' : '100vw'}
          `}
        />
      </div>
      {displayCaption && (
        <figcaption className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center italic leading-relaxed">
          {displayCaption}
        </figcaption>
      )}
    </figure>
  )
}

// Keep the old component for backward compatibility
export const MediaImage = MediaImageBlock

export default MediaImageBlock
