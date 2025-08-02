/* eslint-disable no-console */

import type { Taxonomy } from "@/types/sanity.types";
import type { TaxonomySeed } from "@seed/types";

import chalk from "chalk";

import { seedUploadSingleImageFromUrl } from "@seed/utility/upload-image";

import { getSanityClient } from "@/lib/clients/sanity";

const seedTaxonomy = async ({ taxonomies }: { taxonomies: TaxonomySeed[] }) => {
	const sanityClient = getSanityClient({ useToken: true });

	console.log(chalk.cyan(`\nStarting taxonomy seeding for ${taxonomies.length} categories...\n`));

	try {
		let sanityTransaction = sanityClient.transaction();
		let processedCount = 0;
		let failedCount = 0;
		let index = 1;

		for (const taxonomy of taxonomies) {
			console.log(chalk.blue(`[${index}/${taxonomies.length}] Processing: ${taxonomy.title}`));

			try {
				// Upload image
				const image = await seedUploadSingleImageFromUrl({ imageUrl: taxonomy.imageUrl });

				if (image) {
					console.log(chalk.green(`Image uploaded for ${taxonomy.title} (ID: ${image._id})`));
				} else {
					console.log(chalk.yellow(`No image found for ${taxonomy.title}`));
				}

				// Add to transaction
				sanityTransaction = sanityTransaction.createIfNotExists<Taxonomy>({
					_id: taxonomy.id,
					_type: "taxonomy",
					_rev: "",
					_createdAt: new Date().toISOString(),
					_updatedAt: new Date().toISOString(),
					title: taxonomy.title,
					slug: { _type: "slug", current: taxonomy.slug },
					description: taxonomy.description,
					media: image
						? {
								_type: "mediaImage",
								image: {
									_type: "image",
									asset: { _type: "reference", _ref: image._id },
								},
								altText: taxonomy.alt,
							}
						: undefined,
					seo: {
						_type: "seo",
						metaTitle: taxonomy.title,
						metaDesc: taxonomy.description,
						shareTitle: taxonomy.title,
						shareDesc: taxonomy.description,
					},
				});

				console.log(chalk.green(`Added to transaction: ${taxonomy.title}\n`));
				processedCount++;
			} catch (err) {
				console.log(chalk.red(`Failed processing ${taxonomy.title}: ${(err as Error).message}\n`));
				failedCount++;
			}

			index++;
		}

		await sanityTransaction.commit();

		console.log(chalk.green.bold(`\nTaxonomy seeding completed.`));
		console.log(chalk.green(`Processed: ${processedCount}`));
		console.log(chalk.red(`Failed: ${failedCount}\n`));
	} catch (error) {
		console.error(chalk.red.bold("\nTaxonomy seeding failed:"), error);
	}
};

export { seedTaxonomy };
