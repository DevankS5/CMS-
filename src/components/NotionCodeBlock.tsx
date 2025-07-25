'use client'

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { 
  vscDarkPlus, 
  vs, 
  dracula, 
  atomDark 
} from 'react-syntax-highlighter/dist/esm/styles/prism'

interface NotionCodeBlockProps {
  language?: string
  code: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: string
  theme?: 'dark' | 'light' | 'vscode-dark' | 'github-light' | 'dracula'
}

export const NotionCodeBlock: React.FC<NotionCodeBlockProps> = ({
  language = 'javascript',
  code,
  filename,
  showLineNumbers = true,
  highlightLines,
  theme = 'dark',
}) => {
  // Parse highlight lines
  const getHighlightedLines = () => {
    if (!highlightLines) return []
    
    const lines: number[] = []
    highlightLines.split(',').forEach(item => {
      const trimmed = item.trim()
      if (trimmed.includes('-')) {
        // Range like "5-7"
        const [start, end] = trimmed.split('-').map(Number)
        for (let i = start; i <= end; i++) {
          lines.push(i)
        }
      } else {
        // Single line
        lines.push(Number(trimmed))
      }
    })
    
    return lines
  }

  // Get theme style
  const getThemeStyle = () => {
    switch (theme) {
      case 'light':
        return vs
      case 'vscode-dark':
        return vscDarkPlus
      case 'github-light':
        return vs // Use vs for github-light
      case 'dracula':
        return dracula
      default:
        return atomDark
    }
  }

  const highlightedLines = getHighlightedLines()

  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
      {/* Header with filename and language */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {/* Language badge */}
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {language}
          </span>
          
          {/* Filename */}
          {filename && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filename}
            </span>
          )}
        </div>
        
        {/* Copy button */}
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Copy code"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </button>
      </div>
      
      {/* Code content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={getThemeStyle()}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            color: '#6B7280',
            fontSize: '0.75rem',
            paddingRight: '1rem',
            userSelect: 'none',
          }}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const isHighlighted = highlightedLines.includes(lineNumber)
            return {
              style: {
                backgroundColor: isHighlighted ? (theme === 'light' ? '#FEF3C7' : '#1F2937') : 'transparent',
                display: 'block',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
              }
            }
          }}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default NotionCodeBlock
