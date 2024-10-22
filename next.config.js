/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["mdpdf", "pdfjs-dist"],
  },
};

module.exports = nextConfig;
