import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { NavigationTrail } from "@/components/navigation/navigation-trail";
import { SearchResultsView } from "@/components/search/results-view";

import { getCategoryBySlug, getCategorySlugs } from "@/lib/resources/categories/fetch";
import { buildCategoryBreadcrumb } from "@/lib/resources/categories/services";
import { getCategorySeo } from "@/lib/resources/seo/fetch";
import { getSeo } from "@/lib/resources/seo/services";
import { sanitizeSlug } from "@/lib/utils/validators/sanitize-slug";

type CategoryPagePageProps = {
	params: Promise<{ slug: string }>;
};

export const revalidate = 86400; // 24 Hours

export const generateMetadata = async ({ params }: CategoryPagePageProps): Promise<Metadata> => {
	const { slug } = await params;
	const seoOverrides = await getCategorySeo({ slug });
	if (seoOverrides) return getSeo(seoOverrides);
	return getSeo();
};

export const generateStaticParams = async () => {
	const slugs = await getCategorySlugs();
	if (!slugs) return [];
	return slugs.map((slug) => ({ slug }));
};

const CategoryPage = async ({ params }: CategoryPagePageProps) => {
	const { slug } = await params;

	const category = await getCategoryBySlug({ slug: sanitizeSlug(slug) });
	if (!category || !category.slug || !category.title) return notFound();

	const breadcrumb = await buildCategoryBreadcrumb({ slug: category.slug });
	const filter = `${category.type}:${category.title}`;

	return (
		<Suspense>
			<SearchResultsView
				headerStartContent={<NavigationTrail breadcrumb={breadcrumb} />}
				customFacetFilters={[filter]}
			/>
		</Suspense>
	);
};

export default CategoryPage;
