/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true, // This can help with deployment issues
      domains: [], // Add any image domains you're using
    },
  }
  
export default nextConfig;