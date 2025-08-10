import React from 'react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Demo Page</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This is a demo page for the Payload CMS application. Here you can showcase your content
            and features.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature 1</h2>
            <p className="text-gray-600">
              Demonstrate your first key feature here with engaging content.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature 2</h2>
            <p className="text-gray-600">
              Showcase your second key feature with descriptive content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
