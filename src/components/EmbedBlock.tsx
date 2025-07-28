'use client'

import React from 'react'

interface EmbedBlockProps {
  url: string
  title?: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9'
}

export const EmbedBlock: React.FC<EmbedBlockProps> = ({ url, title, aspectRatio = '16:9' }) => {
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '4:3':
        return 'aspect-[4/3]'
      case '1:1':
        return 'aspect-square'
      case '21:9':
        return 'aspect-[21/9]'
      default: // 16:9
        return 'aspect-video'
    }
  }

  const getEmbedUrl = (originalUrl: string) => {
    // YouTube
    if (originalUrl.includes('youtube.com/watch') || originalUrl.includes('youtu.be/')) {
      const videoId = originalUrl.includes('youtu.be/')
        ? originalUrl.split('youtu.be/')[1]?.split('?')[0]
        : new URL(originalUrl).searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Vimeo
    if (originalUrl.includes('vimeo.com/')) {
      const videoId = originalUrl.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }

    // CodePen
    if (originalUrl.includes('codepen.io/')) {
      const penUrl = originalUrl.replace('/pen/', '/embed/')
      return penUrl
    }

    // For other embeds, try to use the URL as-is
    return originalUrl
  }

  const embedUrl = getEmbedUrl(url)

  return (
    <div className="my-8">
      {title && (
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h4>
      )}

      <div className={`relative overflow-hidden rounded-lg shadow-lg ${getAspectRatioClasses()}`}>
        <iframe
          src={embedUrl}
          title={title || 'Embedded content'}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Fallback link */}
      <div className="mt-2 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View original content ↗
        </a>
      </div>
    </div>
  )
}

export default EmbedBlock
