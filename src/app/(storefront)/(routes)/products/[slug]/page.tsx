import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { ProductCollection } from "@/components/product/collection";
import { ProductCollectionHeading } from "@/components/product/collection/heading";
import { ProductOverview } from "@/components/product/overview";
import { Container } from "@/components/ui/container";

import {
	getProductBySlug,
	getProductSlugs,
	getRelatedProducts,
} from "@/lib/resources/products/fetch";
import { getProductSeo } from "@/lib/resources/seo/fetch";
import { getSeo } from "@/lib/resources/seo/services";
import { normalizeProduct } from "@/lib/utils/commerce/normalize-product";
import { normalizeProductCollection } from "@/lib/utils/commerce/normalize-product-collection";
import { sanitizeSlug } from "@/lib/utils/validators/sanitize-slug";

type ProductPageProps = {
	params: Promise<{ slug: string }>;
};

export const revalidate = 86400; // 24 Hours

export const generateMetadata = async ({ params }: ProductPageProps): Promise<Metadata> => {
	const { slug } = await params;
	const seoOverrides = await getProductSeo({ slug });
	if (seoOverrides) return getSeo(seoOverrides);
	return getSeo();
};

export const generateStaticParams = async () => {
	const slugs = await getProductSlugs({ limit: 100 });
	if (!slugs) return [];
	return slugs.map((slug) => ({ slug }));
};

const ProductPage = async ({ params }: ProductPageProps) => {
	const { slug } = await params;

	const rawProduct = await getProductBySlug({ slug: sanitizeSlug(slug) });
	const product = await normalizeProduct(rawProduct);
	if (!product) return notFound();

	const rawRelatedProducts = await getRelatedProducts({ productId: product.id });
	const relatedProducts = await normalizeProductCollection(rawRelatedProducts);

	return (
		<main className="pb-14 xl:pb-16">
			<Container>
				<section>
					<ProductOverview details={product} />
				</section>
				{relatedProducts.length > 0 ? (
					<section className="pt-16">
						<ProductCollectionHeading className="mb-6 lg:mb-8">
							You May Also Like
						</ProductCollectionHeading>
						<ProductCollection products={relatedProducts} layout="grid" />
					</section>
				) : null}
			</Container>
		</main>
	);
};

export default ProductPage;
