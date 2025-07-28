import React from 'react'
import type { Metadata } from 'next'
import HydrationErrorSuppressor from '@/components/HydrationErrorSuppressor'

export const metadata: Metadata = {
  title: 'Pazload CMS',
  description: 'A modern headless CMS built with Payload and Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <HydrationErrorSuppressor />
        {children}
      </body>
    </html>
  )
}
