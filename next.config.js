/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

	async redirects() {
    return [
      {
        source: '/posts/1',
        destination: '/posts/introducing-the-wesh-network-toolkit',
        permanent: true,
      },
      {
        source: '/posts/2',
        destination: '/posts/wesh-hello-world-app',
        permanent: true,
      },
      {
        source: '/posts/3',
        destination: '/posts/wesh-app-with-persistent-storage',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
