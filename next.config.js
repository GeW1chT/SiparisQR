/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Portal subdomain rewrites
        {
          source: '/portal/:path*',
          destination: '/portal/:path*',
        },
        // Yönetim subdomain rewrites
        {
          source: '/yonetim/:path*',
          destination: '/dashboard/:path*',
        },
        // Dinamik menu rewrites
        {
          source: '/menu/:slug/:path*',
          destination: '/menu/:slug/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig