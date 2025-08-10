import React from 'react'

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Debug Page</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page is used for debugging and testing purposes.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Debug Information</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded p-4">
              <h3 className="font-medium text-gray-800 mb-2">Environment</h3>
              <p className="text-gray-600">Environment: {process.env.NODE_ENV || 'development'}</p>
            </div>

            <div className="bg-gray-100 rounded p-4">
              <h3 className="font-medium text-gray-800 mb-2">Build Information</h3>
              <p className="text-gray-600">
                This debug page can be used to display system information, test components, or
                troubleshoot issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
