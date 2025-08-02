/* eslint-disable no-console */

import type { ShippingCategorySeed } from "@seed/types";

import chalk from "chalk";

import { getCommerceLayerClient } from "@/lib/clients/commerce";

const seedShippingCategory = async ({
	shippingCategories,
}: {
	shippingCategories: ShippingCategorySeed[];
}) => {
	const clClient = await getCommerceLayerClient();

	console.log(
		chalk.cyan(
			`\n=== Starting shipping category seeding for ${shippingCategories.length} items ===\n`
		)
	);

	let processedCount = 0;
	let skippedCount = 0;
	let failedCount = 0;
	let index = 1;

	try {
		// Fetch existing shipping categories once
		const existingCategories = await clClient.shipping_categories.list({
			fields: { shipping_categories: ["code"] },
			pageSize: 25,
		});
		const existingCodes = new Set(existingCategories.map((cat) => cat.code));

		for (const { name, code } of shippingCategories) {
			console.log(chalk.blue(`[${index}/${shippingCategories.length}] Processing: ${name}`));

			try {
				if (!existingCodes.has(code)) {
					await clClient.shipping_categories.create({ name, code });
					console.log(
						chalk.green(`✔ Created shipping category:`) +
							` ${chalk.cyan(name)} (${chalk.yellow(code)})\n`
					);
					processedCount++;
				} else {
					console.log(
						chalk.gray(`Skipped: Shipping category`) +
							` ${chalk.yellow(code)} ` +
							chalk.gray(`already exists\n`)
					);
					skippedCount++;
				}
			} catch (err) {
				console.error(
					chalk.red(`✖ Failed processing ${name} (${code}): ${(err as Error).message}\n`)
				);
				failedCount++;
			}

			index++;
		}

		// Summary
		console.log(chalk.cyan(`\n=== Shipping Category Seeding Summary ===`));
		console.log(chalk.green(`Processed: ${processedCount}`));
		console.log(chalk.gray(`Skipped: ${skippedCount}`));
		console.log(chalk.red(`Failed: ${failedCount}`));
		console.log(chalk.cyan(`========================================\n`));
	} catch (error) {
		console.error(chalk.red.bold("\n✖ Shipping category seeding failed:"), error);
	}
};

export { seedShippingCategory };
