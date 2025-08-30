'use client'

import { useEffect } from 'react'

export function WebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track Core Web Vitals
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
      }).catch(() => {
        // Silently fail if web-vitals is not available
      })
    }
  }, [])

  return null
}