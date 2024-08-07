/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '45.64.99.242',
        port: '8850',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
