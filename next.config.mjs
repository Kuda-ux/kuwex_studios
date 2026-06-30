/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },

  // Compress responses for faster loading
  compress: true,

  // Powered-by header removed for security (hides Next.js)
  poweredByHeader: false,

  // Strict mode for catching bugs
  reactStrictMode: true,

  // Trailing slash consistency for SEO (no duplicate URLs)
  trailingSlash: false,

  // Generate ETags for caching
  generateEtags: true,

  // Optimize package imports for faster builds
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
