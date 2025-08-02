/* eslint-disable no-console */
import type { Product } from "@/types/sanity.types";
import type { ShippingCategory } from "@commercelayer/sdk";
import type { ProductSeed } from "@seed/types";

import chalk from "chalk";
import { nanoid } from "nanoid";

import { findOrCreateSku } from "@seed/utility/find-or-create-sku";
import { getShippingCategories } from "@seed/utility/get-shipping-categories";
import { seedUploadImagesFromUrls } from "@seed/utility/upload-image";

import { getSanityClient } from "@/lib/clients/sanity";

const getRandomShippingCategoryId = (shippingCategories: ShippingCategory[]): string => {
	const randomIndex = Math.floor(Math.random() * shippingCategories.length);
	return shippingCategories[randomIndex].id;
};

/**
 * Seeds a batch of products into Sanity and ensures each product has a linked SKU in Commerce Layer.
 */
const seedProduct = async ({ products }: { products: ProductSeed[] }) => {
	const sanityClient = getSanityClient({ useToken: true });

	try {
		let sanityTransaction = sanityClient.transaction();

		console.log(chalk.cyan("📦 Fetching shipping categories..."));
		const shippingCategories = await getShippingCategories();

		if (!shippingCategories?.length) {
			throw new Error(
				chalk.red("Can't seed products — no shipping categories found in Commerce Layer!")
			);
		}

		console.log(chalk.green(`Found ${shippingCategories.length} shipping categories.`));

		for (const product of products) {
			console.log(chalk.cyan(`\n🔹 Seeding product: ${product.title}`));

			// Pick a random shipping category for the SKU
			const randomShippingCategoryId = getRandomShippingCategoryId(shippingCategories);

			const sku = await findOrCreateSku({
				sku: product.sku,
				inventory: product.inventory,
				pricing: product.pricing,
				shippingCategoryId: randomShippingCategoryId,
			});

			if (!sku) {
				throw new Error(chalk.red(`❌ Failed to seed SKU for product: ${product.title}`));
			}

			console.log(chalk.green(`SKU ready: ${sku.code}`));

			// Upload gallery images
			const galleryRefs: Product["gallery"] = [];
			console.log(chalk.cyan(`Uploading ${product.gallery.length} product images...`));

			const uploadedImages = await seedUploadImagesFromUrls({ imageUrls: product.gallery });

			for (const uploadedImage of uploadedImages) {
				if (uploadedImage?._id) {
					galleryRefs.push({
						_key: nanoid(),
						_type: "mediaImage",
						image: {
							_type: "image",
							asset: {
								_type: "reference",
								_ref: uploadedImage._id,
							},
						},
						altText: product.title,
					});
				}
			}

			console.log(chalk.green(`Uploaded ${galleryRefs.length} images for ${product.title}`));

			sanityTransaction = sanityTransaction.createIfNotExists<Product>({
				_id: product.id,
				_type: "product",
				_rev: "",
				_createdAt: new Date().toISOString(),
				_updatedAt: new Date().toISOString(),
				title: product.title,
				slug: { _type: "slug", current: product.slug },
				description: product.description,
				hasVariants: false,
				sku: { _type: "reference", _ref: sku._id },
				gallery: galleryRefs.length ? galleryRefs : undefined,
				taxon: { _type: "reference", _ref: product.taxon },
				brand: { _type: "reference", _ref: product.brand },
				specifications: product.specifications.map((specification) => ({
					_type: "productSpecification",
					_key: specification.key,
					label: specification.label,
					value: specification.value,
				})),
				seo: {
					_type: "seo",
					metaTitle: product.title,
					metaDesc: product.description,
					shareTitle: product.title,
					shareDesc: product.description,
				},
				relatedProducts: product.relatedProducts.map((relatedProduct) => ({
					_type: "reference",
					_key: relatedProduct.key,
					_ref: relatedProduct.ref,
				})),
			});

			console.log(chalk.green(`Queued product creation: ${product.title}`));
		}

		await sanityTransaction.commit();
		console.log(chalk.bgGreen.black("\nAll products seeded successfully!"));
	} catch (error) {
		console.error(error);
	}
};

export { seedProduct };
