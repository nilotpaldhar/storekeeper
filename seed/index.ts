/* eslint-disable no-console */

/**
 * Central Seeder Runner
 * ---------------------
 * This script runs all individual seeders (taxonomy, taxon, brand, shipping category, product)
 * in sequence while ensuring:
 *   - Failures in one seeder do not stop subsequent seeders from running.
 *   - Clear, consistent logging for each step using Chalk.
 *   - Summary output at the end showing which seeders succeeded or failed.
 *
 * Usage:
 *   Run: `npm run data:seed`
 *
 * Environment:
 *   Requires .env configuration to connect to Sanity and Commerce Layer.
 */

import "dotenv/config";
import chalk from "chalk";

import { brands } from "@seed/data/brands";
import { mobiles as products } from "@seed/data/products";
import { shippingCategories } from "@seed/data/shipping-categories";
import { taxonomies } from "@seed/data/taxonomies";
import { taxons } from "@seed/data/taxons";
import { seedBrand } from "@seed/seeders/brand";
import { seedProduct } from "@seed/seeders/product";
import { seedShippingCategory } from "@seed/seeders/shipping-category";
import { seedTaxon } from "@seed/seeders/taxon";
import { seedTaxonomy } from "@seed/seeders/taxonomy";

/**
 * Type definition for a seeder task.
 * Each task has:
 *   - name: Descriptive label for logging.
 *   - run: Function that triggers the actual seeding process.
 */
type SeederTask = {
	name: string;
	run: () => Promise<void>;
};

const runSeeders = async () => {
	console.log(chalk.cyan.bold("\n=== Starting all seeders ===\n"));
	const startTime = Date.now();

	// Store results for summary output
	const results: { name: string; success: boolean; error?: string }[] = [];

	// Define all seeders in the order they should run
	const seeders: SeederTask[] = [
		{ name: "Taxonomy", run: () => seedTaxonomy({ taxonomies }) },
		{ name: "Taxon", run: () => seedTaxon({ taxons }) },
		{ name: "Brand", run: () => seedBrand({ brands }) },
		{ name: "Shipping Category", run: () => seedShippingCategory({ shippingCategories }) },
		{ name: "Product", run: () => seedProduct({ products }) },
	];

	// Sequentially execute seeders
	for (const seeder of seeders) {
		console.log(chalk.magenta.bold(`→ ${seeder.name} Seeder`));

		try {
			await seeder.run();
			console.log(chalk.green.bold(`✔ ${seeder.name} seeding completed successfully.\n`));
			results.push({ name: seeder.name, success: true });
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : String(err);
			console.error(chalk.red.bold(`✖ ${seeder.name} seeding failed:`), chalk.red(errorMsg), "\n");
			results.push({ name: seeder.name, success: false, error: errorMsg });
		}
	}

	// Final summary after all seeders run
	const endTime = Date.now();
	const elapsed = ((endTime - startTime) / 1000).toFixed(2);

	console.log(chalk.cyan.bold("\n=== Seeder Summary ==="));
	results.forEach((r) => {
		if (r.success) {
			console.log(chalk.green(`✔ ${r.name}`));
		} else {
			console.log(chalk.red(`✖ ${r.name} — ${r.error}`));
		}
	});
	console.log(chalk.gray(`\nTotal time: ${elapsed} seconds`));

	// Exit with non-zero code if any seeder failed
	process.exit(results.some((r) => !r.success) ? 1 : 0);
};

runSeeders();
