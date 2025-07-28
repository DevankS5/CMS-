'use client'

import React from 'react'
import Image from 'next/image'

interface RichTextRendererProps {
  content: any
  className?: string
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    // Handle text nodes
    if (typeof node === 'string') {
      return node
    }

    // Handle different node types
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </p>
        )

      case 'heading':
        const headingClasses = {
          h1: 'text-4xl font-bold mb-6 mt-8',
          h2: 'text-3xl font-bold mb-5 mt-7',
          h3: 'text-2xl font-bold mb-4 mt-6',
          h4: 'text-xl font-bold mb-3 mt-5',
          h5: 'text-lg font-bold mb-2 mt-4',
          h6: 'text-base font-bold mb-2 mt-3',
        }

        const HeadingTag = node.tag as keyof typeof headingClasses
        const headingClass = headingClasses[HeadingTag] || headingClasses.h1

        return React.createElement(
          HeadingTag,
          { key: index, className: headingClass },
          node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex)),
        )

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        const listClass =
          node.listType === 'number'
            ? 'list-decimal list-inside mb-4 space-y-1'
            : 'list-disc list-inside mb-4 space-y-1'

        return (
          <ListTag key={index} className={listClass}>
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </ListTag>
        )

      case 'listitem':
        return (
          <li key={index} className="mb-1">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </li>
        )

      case 'quote':
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700"
          >
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </blockquote>
        )

      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            className="text-blue-600 hover:text-blue-800 underline"
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
          >
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </a>
        )

      case 'upload':
        if (node.value && typeof node.value === 'object') {
          // Debug logging only in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Rendering upload node:', node.value)
          }

          // Handle both absolute URLs and relative paths for local files
          let imageSrc = node.value.url
          if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('/')) {
            imageSrc = `/${imageSrc}`
          }

          return (
            <div key={index} className="my-6">
              <Image
                src={imageSrc}
                alt={node.value.alt || ''}
                width={node.value.width || 800}
                height={node.value.height || 400}
                className="rounded-lg shadow-md"
                onError={(e) => {
                  if (process.env.NODE_ENV === 'development') {
                    console.error('Image failed to load:', imageSrc, e)
                  }
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7/2Q=="
              />
              {node.value.caption && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {node.value.caption}
                </p>
              )}
            </div>
          )
        }
        return null

      case 'block':
        return renderBlock(node, index)

      default:
        // Handle text formatting
        if (node.text !== undefined) {
          let text: React.ReactNode = node.text

          if (node.bold) {
            text = <strong>{text}</strong>
          }
          if (node.italic) {
            text = <em>{text}</em>
          }
          if (node.underline) {
            text = <u>{text}</u>
          }
          if (node.code) {
            text = <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{text}</code>
          }

          return text
        }

        // Recursively render children for unknown types
        if (node.children) {
          return node.children.map((child: any, childIndex: number) =>
            renderNode(child, childIndex),
          )
        }

        return null
    }
  }

  const renderBlock = (block: any, index: number): React.ReactNode => {
    if (!block || !block.blockType) {
      console.warn('RichTextRenderer: Invalid block:', block)
      return null
    }

    switch (block.blockType) {
      case 'codeBlock':
        return (
          <div key={index} className="my-6">
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              {block.language && (
                <div className="bg-gray-800 px-4 py-2 text-sm font-mono text-gray-300">
                  {block.language}
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code className="font-mono text-sm">{block.code}</code>
              </pre>
            </div>
          </div>
        )

      case 'imageBlock':
        return (
          <div key={index} className="my-6">
            {block.image && typeof block.image === 'object' && (
              <>
                <div
                  className={`
                  ${block.size === 'small' ? 'max-w-sm' : ''}
                  ${block.size === 'medium' ? 'max-w-md' : ''}
                  ${block.size === 'large' ? 'max-w-2xl' : ''}
                  ${block.size === 'full' ? 'w-full' : ''}
                  mx-auto
                `}
                >
                  <Image
                    src={block.image.url}
                    alt={block.image.alt || block.caption || ''}
                    width={block.image.width || 800}
                    height={block.image.height || 400}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                  {block.caption && (
                    <p className="text-sm text-gray-600 mt-2 text-center italic">{block.caption}</p>
                  )}
                </div>
              </>
            )}
          </div>
        )

      case 'quoteBlock':
        return (
          <div key={index} className="my-8">
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-4">"{block.text}"</p>
              {(block.author || block.role) && (
                <footer className="text-sm text-gray-600">
                  {block.author && <cite className="font-semibold not-italic">{block.author}</cite>}
                  {block.role && <span className="ml-2 text-gray-500">{block.role}</span>}
                </footer>
              )}
            </blockquote>
          </div>
        )

      default:
        console.warn('RichTextRenderer: Unknown block type:', block.blockType)
        return null
    }
  }

  const renderContent = (content: any): React.ReactNode => {
    if (!content) {
      console.warn('RichTextRenderer: No content provided')
      return null
    }

    try {
      if (Array.isArray(content)) {
        return content.map((item, index) => renderNode(item, index))
      }

      if (content.root && content.root.children) {
        return content.root.children.map((child: any, index: number) => renderNode(child, index))
      }

      return renderNode(content, 0)
    } catch (error) {
      console.error('RichTextRenderer: Error rendering content:', error, content)
      return (
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <p className="text-red-700 font-semibold">Content Rendering Error</p>
          <p className="text-red-600 text-sm">
            There was an issue rendering this content. Please try editing the post content.
          </p>
        </div>
      )
    }
  }

  return (
    <div className={`rich-text-content prose prose-lg max-w-none ${className}`}>
      {renderContent(content)}
    </div>
  )
}

export default RichTextRenderer
