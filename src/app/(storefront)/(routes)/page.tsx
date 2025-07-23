import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { Fragment } from "react";

import { ProductCollection } from "@/components/product/collection";
import { ProductCollectionHeading } from "@/components/product/collection/heading";
import { CategoryCarousel } from "@/components/sections/category-carousel";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { NewsletterSubscription } from "@/components/sections/newsletter-subscription";
import { PromoBlockSlider } from "@/components/sections/promo-block-slider";
import { Container } from "@/components/ui/container";

import { getNotHomePage } from "@/lib/resources/pages/fetch";
import { getHomePageSeo } from "@/lib/resources/seo/fetch";
import { getSeo } from "@/lib/resources/seo/services";
import { normalizeHomePage } from "@/lib/utils/commerce/normalize-home-page";

export const revalidate = 86400; // 24 Hours

export const generateMetadata = async (): Promise<Metadata> => {
	const seoOverrides = await getHomePageSeo();
	if (seoOverrides) return getSeo(seoOverrides);
	return getSeo();
};

const HomePage = async () => {
	const rawPage = await getNotHomePage();
	const page = await normalizeHomePage(rawPage);
	if (!page) return notFound();

	const { promoSection, categorySection, collectionSection, productSections } = page;

	return (
		<main>
			{!promoSection.hidden && promoSection.items.length > 0 ? (
				<section aria-label="Promotional Banners">
					<PromoBlockSlider blocks={promoSection.items} />
				</section>
			) : null}

			{!categorySection.hidden && categorySection.items.length > 0 ? (
				<section className="py-10 xl:py-14" aria-label="Browse product categories">
					<Container>
						<ProductCollectionHeading className="text-center" asChild>
							<h2>{categorySection.title}</h2>
						</ProductCollectionHeading>
						<div className="mt-8">
							<CategoryCarousel items={categorySection.items} />
						</div>
					</Container>
				</section>
			) : null}

			{!collectionSection.hidden && collectionSection.items.length > 0 ? (
				<section className="py-10 xl:py-14" aria-label="Browse Product Collections">
					<Container>
						<CollectionGrid items={collectionSection.items} />
					</Container>
				</section>
			) : null}

			{productSections.map((section) => (
				<Fragment key={section.refKey}>
					{!section.hidden ? (
						<section className="py-10 xl:py-14">
							<Container>
								<ProductCollectionHeading className="mb-6 border-b border-neutral-100 pb-6" asChild>
									<h2>{section.title}</h2>
								</ProductCollectionHeading>
								<ProductCollection products={section.products} layout="grid" />
							</Container>
						</section>
					) : null}
				</Fragment>
			))}

			<section aria-label="Subscribe to our newsletter">
				<NewsletterSubscription />
			</section>
			<section aria-label="Service highlights" className="py-8 xl:py-10">
				<Container>
					<FeatureHighlights />
				</Container>
			</section>
		</main>
	);
};

export default HomePage;
