/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      // Стари URL адреси от предишния сайт, които Search Console докладва като 404.
      { source: '/Courses/Math5', destination: '/courses/matematika-5-klas', permanent: true },
      { source: '/Courses/Math6', destination: '/courses/matematika-6-klas', permanent: true },
      { source: '/Courses/Math7', destination: '/courses/matematika-7-klas', permanent: true },
      { source: '/Courses/:path*', destination: '/courses', permanent: true },
      { source: '/Courses', destination: '/courses', permanent: true },
      { source: '/blog/category/:path*', destination: '/blog', permanent: true },
    ]
  },
}

module.exports = nextConfig
