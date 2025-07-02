import type { Metadata } from "next";

import { PortableText } from "next-sanity";
import { Info } from "lucide-react";
import { Container } from "@/components/ui/container";

import { notFound } from "next/navigation";

import { getSeo } from "@/lib/resources/seo/services";
import { getStaticPageSeoBySlug } from "@/lib/resources/seo/fetch";
import { getStaticPageBySlug, getStaticPageSlugs } from "@/lib/resources/pages/fetch";

import { cn } from "@/lib/utils/general/cn";
import { sanitizeSlug } from "@/lib/utils/validators/sanitize-slug";

type StaticCMSPageProps = {
	params: Promise<{ slug: string }>;
};

export const revalidate = 86400; // 24 Hours

export const generateMetadata = async ({ params }: StaticCMSPageProps): Promise<Metadata> => {
	const { slug } = await params;
	const seoOverrides = await getStaticPageSeoBySlug({ slug });
	if (seoOverrides) return getSeo(seoOverrides);
	return getSeo();
};

export const generateStaticParams = async () => {
	const slugs = await getStaticPageSlugs();
	if (!slugs) return [];
	return slugs.map((slug) => ({ slug }));
};

const StaticCMSPage = async ({ params }: StaticCMSPageProps) => {
	const { slug } = await params;
	const page = await getStaticPageBySlug({ slug: sanitizeSlug(slug) });
	if (!page) return notFound();

	const classNames = {
		root: "prose max-w-none text-sm text-neutral-800",
		headings:
			"prose-headings:mt-4 prose-headings:mb-2 prose-headings:font-semibold prose-headings:text-neutral-900",
		h1: "prose-h1:mt-6 prose-h1:mb-3 prose-h1:text-2xl",
		h2: "prose-h2:mt-5 prose-h2:mb-2 prose-h2:text-xl",
		h3: "prose-h3:mt-4 prose-h3:mb-2 prose-h3:text-lg",
		h4: "prose-h4:mt-3 prose-h4:mb-1 prose-h4:text-base",
		paragraph: "prose-p:mb-2 prose-p:leading-relaxed",
		anchor: "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
		list: "prose-ul:my-2 prose-ol:my-2 prose-li:mb-1 prose-ul:pl-5 prose-ol:pl-5",
	};

	return (
		<main className="bg-white pb-8 sm:bg-neutral-50">
			<Container className=" ">
				<div className="mx-auto max-w-5xl bg-white py-6 sm:px-8">
					{page.content ? (
						<div className={cn(...Object.values(classNames))}>
							<PortableText value={page.content} />
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-16 text-neutral-700">
							<Info size={32} className="mb-2 text-neutral-500" />
							<div className="mt-4 space-y-1 text-center text-base">
								<p>The content you are looking for is not available at the moment.</p>
								<p>Please contact support if you believe this is an error.</p>
							</div>
						</div>
					)}
				</div>
			</Container>
		</main>
	);
};

export default StaticCMSPage;
