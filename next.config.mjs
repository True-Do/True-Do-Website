/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: { ignoreBuildErrors: true },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
