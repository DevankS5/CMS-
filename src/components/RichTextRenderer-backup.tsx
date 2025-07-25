'use client'

import React from 'react'
import { CodeBlock } from './CodeBlock'
import { ImageGallery } from './ImageGallery'
import { MediaImageBlock } from './MediaImage'
import { NotionCodeBlock } from './NotionCodeBlock'
import { CalloutBlock } from './CalloutBlock'
import { QuoteBlock } from './QuoteBlock'
import { EmbedBlock } from './EmbedBlock'
import Image from 'next/image'

interface RichTextRendererProps {
  content: any // The rich text content from Payload
  className?: string
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className = '',
}) => {
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
            {node.children?.map((child: any, childIndex: number) =>
              renderNode(child, childIndex)
            )}
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
        
        const children = node.children?.map((child: any, childIndex: number) =>
          renderNode(child, childIndex)
        )

        switch (node.tag) {
          case 'h1':
            return <h1 key={index} className={headingClasses.h1}>{children}</h1>
          case 'h2':
            return <h2 key={index} className={headingClasses.h2}>{children}</h2>
          case 'h3':
            return <h3 key={index} className={headingClasses.h3}>{children}</h3>
          case 'h4':
            return <h4 key={index} className={headingClasses.h4}>{children}</h4>
          case 'h5':
            return <h5 key={index} className={headingClasses.h5}>{children}</h5>
          case 'h6':
            return <h6 key={index} className={headingClasses.h6}>{children}</h6>
          default:
            return <h2 key={index} className={headingClasses.h2}>{children}</h2>
        }

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag
            key={index}
            className={`mb-4 pl-6 ${
              node.listType === 'number' ? 'list-decimal' : 'list-disc'
            }`}
          >
            {node.children?.map((child: any, childIndex: number) =>
              renderNode(child, childIndex)
            )}
          </ListTag>
        )

      case 'listitem':
        return (
          <li key={index} className="mb-2">
            {node.children?.map((child: any, childIndex: number) =>
              renderNode(child, childIndex)
            )}
          </li>
        )

      case 'quote':
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-6"
          >
            {node.children?.map((child: any, childIndex: number) =>
              renderNode(child, childIndex)
            )}
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
            {node.children?.map((child: any, childIndex: number) =>
              renderNode(child, childIndex)
            )}
          </a>
        )

      case 'upload':
        if (node.value && node.value.url) {
          return (
            <div key={index} className="my-6">
              <Image
                src={node.value.url}
                alt={node.value.alt || ''}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
              {node.value.caption && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {node.value.caption}
                </p>
              )}
            </div>
          )
        }
        return null

      case 'horizontalrule':
        return <hr key={index} className="my-8 border-gray-300" />

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
          if (node.strikethrough) {
            text = <s>{text}</s>
          }
          if (node.code) {
            text = (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                {text}
              </code>
            )
          }

          return <span key={index}>{text}</span>
        }

        return null
    }
  }

  const renderBlock = (block: any, index: number): React.ReactNode => {
    // Add defensive checks for malformed blocks
    if (!block || typeof block !== 'object') {
      console.warn('RichTextRenderer: Invalid block encountered:', block)
      return null
    }

    if (!block.blockType) {
      console.warn('RichTextRenderer: Block missing blockType:', block)
      return null
    }

    switch (block.blockType) {
      case 'mediaImage':
        console.log('RichTextRenderer: Rendering MediaImage block', block)
        return (
          <MediaImageBlock
            key={index}
            media={block.media}
            size={block.size}
            alignment={block.alignment}
            caption={block.caption}
            rounded={block.rounded}
            shadow={block.shadow}
          />
        )

      case 'codeBlock':
        return (
          <NotionCodeBlock
            key={index}
            language={block.language}
            code={block.code}
            filename={block.filename}
            showLineNumbers={block.showLineNumbers}
            highlightLines={block.highlightLines}
            theme={block.theme}
          />
        )

      case 'code':
        // Legacy code block support
        return (
          <CodeBlock
            key={index}
            language={block.language}
            code={block.code}
            filename={block.filename}
            showLineNumbers={block.showLineNumbers}
            highlightLines={block.highlightLines}
          />
        )

      case 'callout':
        return (
          <CalloutBlock
            key={index}
            type={block.calloutType}
            title={block.title}
            content={block.content}
            icon={block.icon}
          />
        )

      case 'quote':
        return (
          <QuoteBlock
            key={index}
            quote={block.quote}
            author={block.author}
            role={block.role}
            company={block.company}
            avatar={block.avatar}
          />
        )

      case 'embed':
        return (
          <EmbedBlock
            key={index}
            url={block.url}
            title={block.title}
            aspectRatio={block.aspectRatio}
          />
        )

      case 'imageGallery':
        return (
          <ImageGallery
            key={index}
            images={block.images}
            layout={block.layout}
            columns={block.columns}
          />
        )

      default:
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
        return content.root.children.map((child: any, index: number) =>
          renderNode(child, index)
        )
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
