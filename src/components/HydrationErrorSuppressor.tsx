'use client'

import { useEffect } from 'react'

export function HydrationErrorSuppressor() {
  useEffect(() => {
    // Check if suppression is enabled
    const shouldSuppress =
      process.env.NEXT_PUBLIC_SUPPRESS_HYDRATION_WARNINGS === 'true' ||
      process.env.NODE_ENV === 'development'

    if (!shouldSuppress) return

    // Store original console methods
    const originalError = console.error
    const originalWarn = console.warn

    // Override console.error to filter out hydration warnings
    console.error = (...args) => {
      const message = args[0]

      // Filter out specific hydration warnings
      if (
        typeof message === 'string' &&
        (message.includes('hydration') ||
          message.includes('Hydration') ||
          message.includes('data-new-gr-c-s-check-loaded') ||
          message.includes('data-gr-ext-installed') ||
          message.includes('suppressHydrationWarning') ||
          message.includes('server rendered HTML') ||
          message.includes('server-side HTML') ||
          message.includes('client properties') ||
          message.includes('browser extension'))
      ) {
        // Log a simplified message instead
        if (process.env.NODE_ENV === 'development') {
          console.log('🔧 Hydration warning suppressed (likely browser extension)')
        }
        return
      }

      // Call original console.error for other messages
      originalError.apply(console, args)
    }

    // Also suppress warnings
    console.warn = (...args) => {
      const message = args[0]

      if (
        typeof message === 'string' &&
        (message.includes('hydration') ||
          message.includes('Hydration') ||
          message.includes('suppressHydrationWarning'))
      ) {
        return
      }

      originalWarn.apply(console, args)
    }

    // Cleanup function to restore original console methods
    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  return null
}

export default HydrationErrorSuppressor
