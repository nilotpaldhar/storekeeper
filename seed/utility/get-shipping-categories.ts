import chalk from "chalk";

import { getCommerceLayerClient } from "@/lib/clients/commerce";

const getShippingCategories = async () => {
	const clClient = await getCommerceLayerClient();

	try {
		const shippingCategories = await clClient.shipping_categories.list({
			fields: { shipping_categories: ["code"] },
			pageSize: 25,
		});

		return shippingCategories;
	} catch (error) {
		console.error(chalk.red("❌ Error seeding shipping categories:"), error);
	}
};

export { getShippingCategories };
