'use client'

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language?: string
  code: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'javascript',
  code,
  filename,
  showLineNumbers = true,
  highlightLines,
}) => {
  // Parse highlighted lines
  const getHighlightedLines = (highlightLines?: string): number[] => {
    if (!highlightLines) return []

    const lines: number[] = []
    const parts = highlightLines.split(',')

    parts.forEach((part) => {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number)
        for (let i = start; i <= end; i++) {
          lines.push(i)
        }
      } else {
        lines.push(Number(trimmed))
      }
    })

    return lines
  }

  const highlightedLines = getHighlightedLines(highlightLines)

  return (
    <div className="code-block-wrapper my-6">
      {filename && (
        <div className="code-filename bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono border-b border-gray-700 rounded-t-lg">
          📄 {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        lineProps={(lineNumber: number) => {
          const isHighlighted = highlightedLines.includes(lineNumber)
          return {
            style: {
              backgroundColor: isHighlighted ? 'rgba(255, 255, 0, 0.1)' : 'transparent',
              display: 'block',
              width: '100%',
            },
          }
        }}
        customStyle={{
          margin: 0,
          borderRadius: filename ? '0 0 8px 8px' : '8px',
          fontSize: '14px',
          lineHeight: '1.5',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
