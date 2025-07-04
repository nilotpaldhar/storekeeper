import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ProductDetails } from "@/components/product/details";
import { ProductRecommendations } from "@/components/product/recommendations";

import { notFound } from "next/navigation";

import { getSeo } from "@/lib/resources/seo/services";
import { getProductSeo } from "@/lib/resources/seo/fetch";
import { getProductSlugs, getProductBySlug } from "@/lib/resources/product/fetch";

import { sanitizeSlug } from "@/lib/utils/validators/sanitize-slug";
import { normalizeProduct } from "@/lib/utils/commerce/normalize-product";

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
	const slugs = await getProductSlugs();
	if (!slugs) return [];
	return slugs.map((slug) => ({ slug }));
};

const ProductPage = async ({ params }: ProductPageProps) => {
	const { slug } = await params;
	const rawProduct = await getProductBySlug({ slug: sanitizeSlug(slug) });
	const product = normalizeProduct(rawProduct);

	if (!product) return notFound();

	return (
		<main className="pt-10 pb-16">
			<Container className="flex flex-col space-y-6">
				<section>
					<ProductDetails
						title={product.title}
						slug={product.slug}
						description={product.description}
						hasVariants={product.hasVariants}
						brand={product.brand}
						options={product.options}
						variants={product.variants}
						specifications={product.specifications}
						sku={product.sku}
						gallery={product.gallery}
					/>
				</section>
				<section className="pt-10">
					<ProductRecommendations />
				</section>
			</Container>
		</main>
	);
};

export default ProductPage;
