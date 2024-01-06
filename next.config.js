const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'cdn.sanity.io' },
			{ protocol: 'https', hostname: 'cdn.chec.io' },
		],
		unoptimized: process.env.IMAGE_OPTIMIZATION === 'off',
	},
};

module.exports = nextConfig;
