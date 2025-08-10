import React from 'react'

export default function SimpleDebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Simple Debug</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Debug Output</h2>

        <div className="space-y-4">
          <div className="border rounded p-3 bg-gray-50">
            <h3 className="font-medium text-gray-700">System Status</h3>
            <p className="text-sm text-gray-600">All systems operational</p>
          </div>

          <div className="border rounded p-3 bg-gray-50">
            <h3 className="font-medium text-gray-700">Debug Mode</h3>
            <p className="text-sm text-gray-600">
              Debug mode: {process.env.NODE_ENV === 'development' ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
