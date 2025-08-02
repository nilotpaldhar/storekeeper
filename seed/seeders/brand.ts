/* eslint-disable no-console */

import type { Brand } from "@/types/sanity.types";
import type { BrandSeed } from "@seed/types";

import chalk from "chalk";

import { getSanityClient } from "@/lib/clients/sanity";

const seedBrand = async ({ brands }: { brands: BrandSeed[] }) => {
	const sanityClient = getSanityClient({ useToken: true });

	console.log(chalk.cyan(`\n=== Starting brand seeding for ${brands.length} items ===\n`));

	let sanityTransaction = sanityClient.transaction();

	let processedCount = 0;
	let failedCount = 0;
	const skippedCount = 0;
	let index = 1;

	for (const brand of brands) {
		console.log(chalk.blue(`[${index}/${brands.length}] Processing: ${brand.title}`));

		try {
			sanityTransaction = sanityTransaction.createIfNotExists<Brand>({
				_id: brand.id,
				_type: "brand",
				_rev: "",
				_createdAt: new Date().toISOString(),
				_updatedAt: new Date().toISOString(),
				title: brand.title,
				slug: { _type: "slug", current: brand.slug },
				description: brand.description,
				logo: undefined,
				seo: {
					_type: "seo",
					metaTitle: brand.title,
					metaDesc: brand.description,
					shareTitle: brand.title,
					shareDesc: brand.description,
				},
			});

			console.log(chalk.green(`✔ Added to transaction: ${brand.title}\n`));
			processedCount++;
		} catch (err) {
			console.error(chalk.red(`✖ Failed processing ${brand.title}: ${(err as Error).message}\n`));
			failedCount++;
		}

		index++;
	}

	try {
		await sanityTransaction.commit();
	} catch (err) {
		console.error(chalk.red.bold("\n✖ Transaction commit failed:"), err);
	}

	// Final uniform summary
	console.log(chalk.cyan(`\n=== Brand Seeding Summary ===`));
	console.log(chalk.green(`Processed: ${processedCount}`));
	console.log(chalk.gray(`Skipped: ${skippedCount}`));
	console.log(chalk.red(`Failed: ${failedCount}`));
	console.log(chalk.cyan(`=============================\n`));
};

export { seedBrand };
