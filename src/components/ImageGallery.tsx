'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: Array<{
    image: {
      url?: string
      alt?: string
    }
    alt?: string
    caption?: string
  }>
  layout?: 'grid' | 'carousel' | 'masonry'
  columns?: '2' | '3' | '4'
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  layout = 'grid',
  columns = '3',
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const getGridClasses = () => {
    switch (columns) {
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '4':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default: // '3'
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  const renderGridLayout = () => (
    <div className={`grid gap-4 ${getGridClasses()}`}>
      {images.map((item, index) => (
        <div
          key={index}
          className="group cursor-pointer"
          onClick={() => setSelectedImage(index)}
        >
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <Image
              src={item.image.url || ''}
              alt={item.alt || item.image.alt || ''}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {item.caption && (
            <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  )

  const renderCarousel = () => (
    <div className="relative">
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {images.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={item.image.url || ''}
                  alt={item.alt || item.image.alt || ''}
                  fill
                  className="object-cover"
                />
              </div>
              {item.caption && (
                <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMasonry = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {images.map((item, index) => (
        <div
          key={index}
          className="break-inside-avoid mb-4 cursor-pointer"
          onClick={() => setSelectedImage(index)}
        >
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={item.image.url || ''}
              alt={item.alt || item.image.alt || ''}
              width={400}
              height={300}
              className="w-full h-auto hover:scale-105 transition-transform duration-300"
            />
          </div>
          {item.caption && (
            <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  )

  const renderLayout = () => {
    switch (layout) {
      case 'carousel':
        return renderCarousel()
      case 'masonry':
        return renderMasonry()
      default:
        return renderGridLayout()
    }
  }

  return (
    <div className="image-gallery my-8">
      {renderLayout()}

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <Image
              src={images[selectedImage].image.url || ''}
              alt={images[selectedImage].alt || images[selectedImage].image.alt || ''}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            {images[selectedImage].caption && (
              <p className="text-white text-center mt-4">
                {images[selectedImage].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
