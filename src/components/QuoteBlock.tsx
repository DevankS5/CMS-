'use client'

import React from 'react'
import Image from 'next/image'

interface QuoteBlockProps {
  quote: string
  author?: string
  role?: string
  company?: string
  avatar?:
    | {
        url: string
        alt?: string
      }
    | string
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, role, company, avatar }) => {
  const avatarData = typeof avatar === 'string' ? null : avatar

  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border-l-4 border-blue-500">
      {/* Quote icon */}
      <div className="mb-4">
        <svg className="w-8 h-8 text-blue-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Quote text */}
      <blockquote className="text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author info */}
      {(author || role || company) && (
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          {avatarData?.url && (
            <div className="flex-shrink-0">
              <Image
                src={avatarData.url}
                alt={avatarData.alt || author || 'Author'}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
              />
            </div>
          )}

          {/* Author details */}
          <div>
            {author && (
              <div className="font-semibold text-gray-900 dark:text-gray-100">{author}</div>
            )}
            {(role || company) && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {role}
                {role && company && ', '}
                {company}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuoteBlock
