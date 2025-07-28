'use client'

import React from 'react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'note'
  title?: string
  content: any // Rich text content
}

const getCalloutStyles = (type: string) => {
  switch (type) {
    case 'warning':
      return {
        container: 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800',
        icon: '⚠️',
        titleColor: 'text-yellow-800',
      }
    case 'error':
      return {
        container: 'bg-red-50 border-l-4 border-red-400 text-red-800',
        icon: '❌',
        titleColor: 'text-red-800',
      }
    case 'success':
      return {
        container: 'bg-green-50 border-l-4 border-green-400 text-green-800',
        icon: '✅',
        titleColor: 'text-green-800',
      }
    case 'note':
      return {
        container: 'bg-purple-50 border-l-4 border-purple-400 text-purple-800',
        icon: '📝',
        titleColor: 'text-purple-800',
      }
    default: // info
      return {
        container: 'bg-blue-50 border-l-4 border-blue-400 text-blue-800',
        icon: 'ℹ️',
        titleColor: 'text-blue-800',
      }
  }
}

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, content }) => {
  const styles = getCalloutStyles(type)

  return (
    <div className={`callout p-4 rounded-r-lg my-4 ${styles.container}`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <span className="text-lg">{styles.icon}</span>
        </div>
        <div className="flex-1">
          {title && <h4 className={`font-semibold mb-1 ${styles.titleColor}`}>{title}</h4>}
          <div className="callout-content">
            {/* This would typically render the rich text content */}
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              <div className="rich-text-content">
                {/* Rich text rendering would go here */}
                {JSON.stringify(content)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Callout
