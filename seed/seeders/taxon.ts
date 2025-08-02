/* eslint-disable no-console */

import type { Taxon } from "@/types/sanity.types";
import type { TaxonSeed } from "@seed/types";

import chalk from "chalk";

import { getSanityClient } from "@/lib/clients/sanity";

const seedTaxon = async ({ taxons }: { taxons: TaxonSeed[] }) => {
	const sanityClient = getSanityClient({ useToken: true });

	console.log(chalk.cyan(`\n=== Starting taxon seeding for ${taxons.length} items ===\n`));

	let processedCount = 0;
	let failedCount = 0;
	let index = 1;

	try {
		let sanityTransaction = sanityClient.transaction();

		for (const taxon of taxons) {
			console.log(chalk.blue(`[${index}/${taxons.length}] Processing: ${taxon.title}`));

			try {
				sanityTransaction = sanityTransaction.createIfNotExists<Taxon>({
					_id: taxon.id,
					_type: "taxon",
					_rev: "",
					_createdAt: new Date().toISOString(),
					_updatedAt: new Date().toISOString(),
					title: taxon.title,
					slug: { _type: "slug", current: taxon.slug },
					description: taxon.description,
					isLeaf: true,
					parent: undefined,
					media: undefined,
					taxonomy: { _type: "reference", _ref: taxon.taxonomy },
					seo: {
						_type: "seo",
						metaTitle: taxon.title,
						metaDesc: taxon.description,
						shareTitle: taxon.title,
						shareDesc: taxon.description,
					},
				});

				console.log(chalk.green(`✔ Added to transaction: ${taxon.title}\n`));
				processedCount++;
			} catch (err) {
				console.log(chalk.red(`✖ Failed processing ${taxon.title}: ${(err as Error).message}\n`));
				failedCount++;
			}

			index++;
		}

		await sanityTransaction.commit();

		// Summary
		console.log(chalk.cyan(`\n=== Taxon Seeding Summary ===`));
		console.log(chalk.green(`Processed: ${processedCount}`));
		console.log(chalk.red(`Failed: ${failedCount}`));
		console.log(chalk.cyan(`=============================\n`));
	} catch (error) {
		console.error(chalk.red.bold("\n✖ Taxon seeding failed:"), error);
	}
};

export { seedTaxon };
