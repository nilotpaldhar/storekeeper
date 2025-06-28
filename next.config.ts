import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
	},
	async rewrites() {
		return [{ source: "/:slug", destination: "/pages/:slug" }];
	},
};

export default nextConfig;
