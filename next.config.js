/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/email/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, noimageindex',
          },
        ],
      },
      {
        source: '/Email/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, noimageindex',
          },
        ],
      },
      {
        source: '/email-signature',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, noimageindex',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      { source: '/email/alex', destination: '/email/alex/index.html' },
      { source: '/email/jennifer', destination: '/email/jennifer/index.html' },
      { source: '/email/on-ellis', destination: '/email/on-ellis/index.html' },
      { source: '/email/onellis', destination: '/email/on-ellis/index.html' },
      { source: '/Email/alex', destination: '/email/alex/index.html' },
      { source: '/Email/jennifer', destination: '/email/jennifer/index.html' },
      { source: '/Email/on-ellis', destination: '/email/on-ellis/index.html' },
      { source: '/Email/onellis', destination: '/email/on-ellis/index.html' },
      { source: '/Email/:path*', destination: '/email/:path*' },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  experimental: {
    reactCompiler: false,
  },
}

module.exports = nextConfig
