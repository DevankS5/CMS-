import React from 'react'

export default function DemoEnhancedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Enhanced Demo Page</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This is an enhanced demo page for the Payload CMS application. 
            Additional features and content will be added here.
          </p>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Demo Content</h2>
          <p className="text-gray-600 leading-relaxed">
            This page demonstrates enhanced functionality and can be customized
            to showcase advanced features of your CMS.
          </p>
        </div>
      </div>
    </div>
  )
}
