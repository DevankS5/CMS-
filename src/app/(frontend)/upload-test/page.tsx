import React from 'react'

export default function UploadTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Upload Test Page</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page is used for testing upload functionality in the Payload CMS application.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Testing Area</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Use this page to test various upload features and file handling capabilities of your CMS
            implementation.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Upload testing components can be added here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
