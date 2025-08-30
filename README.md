# KODEGAS Vision Website

This is the official website for KODEGAS, built with Next.js 15 and optimized for search engines and performance.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## SEO Optimizations

This website includes comprehensive SEO optimizations:

### Metadata & Social Sharing
- Complete Open Graph tags for social media sharing
- Twitter Card optimization
- Rich metadata with keywords and descriptions
- Proper title and description hierarchies

### Search Engine Optimization
- Structured data (JSON-LD) for rich snippets
- XML sitemap (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Canonical URLs
- Proper heading hierarchy (H1-H4)

### Performance & Accessibility
- Optimized images with descriptive alt text
- Font preloading for performance
- Mobile-optimized viewport settings
- ARIA labels for accessibility
- Security headers

### Analytics Ready
- Google Analytics configuration template
- Google Tag Manager support
- Custom event tracking helpers
- Environment-based tracking controls

## Configuration

1. Copy `.env.example` to `.env.local`
2. Fill in your analytics IDs and verification codes
3. Update the domain references in metadata
4. Add your social media handles

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Main layout with SEO metadata
│   └── page.tsx            # Homepage
├── components/
│   ├── seo/                # SEO helper components
│   ├── sections/           # Page sections
│   └── ui/                 # UI components
├── lib/
│   └── analytics.ts        # Analytics configuration
public/
├── robots.txt              # Search engine directives
├── sitemap.xml            # XML sitemap
└── manifest.json          # PWA manifest
```

## SEO Checklist

- [x] Meta titles and descriptions
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Structured data (JSON-LD)
- [x] XML sitemap
- [x] Robots.txt
- [x] Canonical URLs
- [x] Image alt attributes
- [x] Semantic HTML structure
- [x] Performance optimizations
- [x] Mobile optimization
- [x] Analytics preparation

## Development

To get started, take a look at `src/app/page.tsx`.
