export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f0f23;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#cc66ff;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="600" y="300" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">KODEGAS</text>
      <text x="600" y="380" font-family="Arial, sans-serif" font-size="36" fill="#7DF9FF" text-anchor="middle">Innovating the Future</text>
      <text x="600" y="450" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">AI • ML • IoT • Web • Mobile</text>
    </svg>`,
    {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  )
}