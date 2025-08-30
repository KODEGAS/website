# KODEGAS Vision Website

A high-performance Next.js website for KODEGAS, featuring optimized loading times and comprehensive SEO.

## Performance Optimizations

This website has been optimized for minimal load times:

- **68% reduction in page size**: From 191kB to 61.2kB
- **42% reduction in First Load JS**: From 304kB to 174kB
- **Lazy loading**: Three.js scenes are lazy-loaded to prevent blocking initial render
- **Image optimization**: WebP/AVIF formats with proper sizing and lazy loading
- **Font optimization**: Google Fonts with `font-display: swap` for faster rendering
- **Bundle optimization**: Code splitting and tree shaking for minimal bundles

## SEO Features

- Comprehensive metadata with Open Graph and Twitter Cards
- Structured data (JSON-LD) for business information
- Dynamic sitemap generation
- Robots.txt for search engine guidance
- Proper semantic HTML and accessibility
- Optimized meta descriptions and titles

## Performance Monitoring

Run `npm run build:analyze` to analyze bundle sizes and identify optimization opportunities.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:9002` to see the website.

## Build for Production

```bash
npm run build
npm start
```
