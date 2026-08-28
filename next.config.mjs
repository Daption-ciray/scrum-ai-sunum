/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bu klasör projenin kökü; üstteki geliştirme dosyaları izlenmesin.
  outputFileTracingRoot: import.meta.dirname,
};
export default nextConfig;
