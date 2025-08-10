import React from 'react'
import type { Metadata } from 'next'
import HydrationErrorSuppressor from '@/components/HydrationErrorSuppressor'
import config from '@payload-config'
import '@payloadcms/next/css'
import './(payload)/custom.scss'
import { importMap } from './(payload)/admin/importMap.js'
import { RootLayout as PayloadRootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

export const metadata: Metadata = {
  title: 'Pazload CMS',
  description: 'A modern headless CMS built with Payload and Next.js',
}

// Server action wrapper used by Payload's RootLayout
const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  const { handleServerFunctions } = await import('@payloadcms/next/layouts')
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

// Unified root layout: ensures only ONE <html>/<body> pair is rendered for the entire app
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PayloadRootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{ lang: 'en', suppressHydrationWarning: true }}
    >
      <HydrationErrorSuppressor />
      {children}
    </PayloadRootLayout>
  )
}
