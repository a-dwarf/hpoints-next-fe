/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['s2.loli.net', 'airlyft.one']
	},
	async rewrites() {
		return [
			{
				source: '/api/file/upload',
				destination: `https://sm.ms/api/v2/upload`,
			},
		]
	},
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
