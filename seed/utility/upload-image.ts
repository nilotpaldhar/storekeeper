/* eslint-disable no-console */

import chalk from "chalk";
import fetch from "node-fetch";
import pLimit from "p-limit";

import { getSanityClient } from "@/lib/clients/sanity";

/**
 * Upload a single image from a given URL to Sanity's asset store.
 */
const seedUploadSingleImageFromUrl = async ({
	imageUrl,
	filename,
}: {
	imageUrl: string;
	filename?: string;
}) => {
	const sanityClient = getSanityClient({ useToken: true, useCdn: false });

	try {
		if (!imageUrl) {
			console.log(chalk.yellow("No image URL provided - skipping upload"));
			return null;
		}

		const response = await fetch(imageUrl);

		if (!response.ok) {
			console.log(chalk.yellow(`Failed to fetch image — Status: ${response.status}`));
			return null;
		}

		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const finalFilename = filename || imageUrl.split("/").pop() || "image.jpg";

		const asset = await sanityClient.assets.upload("image", buffer, {
			filename: finalFilename,
		});

		return asset;
	} catch (error) {
		console.log(chalk.red(`❌ Image upload failed: ${imageUrl}`), chalk.gray(error));
		return null;
	}
};

/**
 * Upload one or multiple images from URLs to Sanity's asset store with concurrency control.
 */
const seedUploadImagesFromUrls = async ({
	imageUrls,
	concurrency = 3,
}: {
	imageUrls: string | string[];
	concurrency?: number;
}) => {
	const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

	const limit = pLimit(concurrency);

	const uploadTasks = urls.map((url) =>
		limit(() => seedUploadSingleImageFromUrl({ imageUrl: url }))
	);

	const results = await Promise.all(uploadTasks);
	return results;
};

export { seedUploadSingleImageFromUrl, seedUploadImagesFromUrls };
