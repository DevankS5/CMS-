'use client'

import React from 'react'

interface CalloutBlockProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'note' | 'tip' | 'important'
  title?: string
  content: string
  icon?: string
}

export const CalloutBlock: React.FC<CalloutBlockProps> = ({
  type = 'info',
  title,
  content,
  icon,
}) => {
  const getTypeConfig = () => {
    const configs = {
      info: {
        icon: icon || '💡',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-900 dark:text-blue-100',
        iconBg: 'bg-blue-100 dark:bg-blue-800',
      },
      warning: {
        icon: icon || '⚠️',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        textColor: 'text-yellow-900 dark:text-yellow-100',
        iconBg: 'bg-yellow-100 dark:bg-yellow-800',
      },
      error: {
        icon: icon || '❌',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        textColor: 'text-red-900 dark:text-red-100',
        iconBg: 'bg-red-100 dark:bg-red-800',
      },
      success: {
        icon: icon || '✅',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        textColor: 'text-green-900 dark:text-green-100',
        iconBg: 'bg-green-100 dark:bg-green-800',
      },
      note: {
        icon: icon || '📝',
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        borderColor: 'border-gray-200 dark:border-gray-700',
        textColor: 'text-gray-900 dark:text-gray-100',
        iconBg: 'bg-gray-100 dark:bg-gray-800',
      },
      tip: {
        icon: icon || '💭',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        textColor: 'text-purple-900 dark:text-purple-100',
        iconBg: 'bg-purple-100 dark:bg-purple-800',
      },
      important: {
        icon: icon || '🔥',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        textColor: 'text-orange-900 dark:text-orange-100',
        iconBg: 'bg-orange-100 dark:bg-orange-800',
      },
    }

    return configs[type] || configs.info
  }

  const config = getTypeConfig()

  return (
    <div className={`my-6 p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${config.iconBg} flex items-center justify-center text-sm`}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className={`flex-1 ${config.textColor}`}>
          {title && <h4 className="font-semibold text-base mb-2">{title}</h4>}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  )
}

export default CalloutBlock
