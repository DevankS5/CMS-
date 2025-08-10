// Simplified passthrough layout so we don't nest <html>/<body> tags.
// The real Payload RootLayout is now applied in /src/app/layout.tsx.
import React from 'react'

export default function PayloadSegmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
