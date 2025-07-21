import type { Metadata } from "next";

import { notFound } from "next/navigation";

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

	const { promoSection } = page;

	return (
		<main>
			{!promoSection.hidden ? (
				<section aria-label="Promotional Banners">
					<PromoBlockSlider blocks={promoSection.items} />
				</section>
			) : null}
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
