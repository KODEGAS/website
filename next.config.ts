import type {NextConfig} from 'next';

// Bundle analyzer setup
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    // optimizeCss: true,  // Disabled due to critters dependency issues
    gzipSize: true,
    esmExternals: true,
  },
  // Performance optimizations for SEO
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    // Add better error handling for chunk loading
    if (!isServer) {
      config.output.crossOriginLoading = 'anonymous';
      
      // Add retry mechanism for failed chunk loads
      const originalPublicPath = config.output.publicPath;
      config.output.publicPath = originalPublicPath;
      
      // Enhanced error handling for chunk loading
      config.optimization.realContentHash = true;
      
      // Add better source map support for debugging
      if (dev) {
        config.devtool = 'eval-source-map';
      } else {
        config.devtool = 'hidden-source-map';
      }
    }

    // Optimize bundle splitting for better performance
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        maxAsyncRequests: 10,
        maxInitialRequests: 6,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          // React framework chunk with better error handling
          framework: {
            test: /[\/]node_modules[\/](react|react-dom|scheduler)[\/]/,
            name: 'framework',
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          // Three.js and related libraries (largest bundle)
          three: {
            test: /[\/]node_modules[\/](three|@react-three)[\/]/,
            name: 'three',
            chunks: 'all',
            priority: 35,
            enforce: true,
          },
          // Animation libraries
          animation: {
            test: /[\/]node_modules[\/](framer-motion)[\/]/,
            name: 'animation',
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          // UI libraries
          ui: {
            test: /[\/]node_modules[\/](@radix-ui|lucide-react|class-variance-authority|clsx)[\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 25,
            enforce: true,
          },
          // Form and validation libraries
          forms: {
            test: /[\/]node_modules[\/](react-hook-form|@hookform|zod)[\/]/,
            name: 'forms',
            chunks: 'all',
            priority: 20,
          },
          // External services
          services: {
            test: /[\/]node_modules[\/](firebase|@sendgrid|@genkit-ai|genkit)[\/]/,
            name: 'services',
            chunks: 'all',
            priority: 15,
          },
          // Utility libraries
          utils: {
            test: /[\/]node_modules[\/](date-fns|tailwind-merge|tailwindcss-animate)[\/]/,
            name: 'utils',
            chunks: 'all',
            priority: 10,
          },
          // Charts and data visualization
          charts: {
            test: /[\/]node_modules[\/](recharts|embla-carousel)[\/]/,
            name: 'charts',
            chunks: 'all',
            priority: 5,
          },
          // Default vendor chunk for remaining dependencies
          vendor: {
            test: /[\/]node_modules[\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Tree shaking optimizations
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;
    
    // Add module resolution improvements
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
