/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Пренасочванията за старите URL адреси (/Courses/*, /blog/category/*)
  // са в middleware.ts — redirects() тук не различава главни/малки букви
  // и /Courses/:path* би хванало и /courses/*.
}

module.exports = nextConfig
