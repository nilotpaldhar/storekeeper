import type { Metadata } from "next";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ILLUSTRATIONS } from "@/constants/media";

import { GoBackButton } from "@/components/navigation/go-back-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

import { getNotFoundPage } from "@/lib/resources/pages/fetch";
import { getNotFoundPageSeo } from "@/lib/resources/seo/fetch";
import { getSeo } from "@/lib/resources/seo/services";

export const revalidate = 86400; // 24 Hours

export const generateMetadata = async (): Promise<Metadata> => {
	const seoOverrides = await getNotFoundPageSeo();
	if (seoOverrides) return getSeo(seoOverrides);
	return getSeo();
};

const NotFoundPage = async () => {
	const page = await getNotFoundPage();

	return (
		<div className="flex min-h-screen items-center justify-center overflow-hidden">
			<Container>
				<div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 md:space-y-8">
					<div>
						<Image
							src={ILLUSTRATIONS.EMPTY_STATES.NOT_FOUND}
							alt="404 Not Found"
							width={401}
							height={267}
						/>
					</div>
					<div className="text-neutral-900">
						<h1 className="text-center text-3xl leading-tight font-normal capitalize md:text-4xl xl:text-5xl">
							{page?.title ?? "Sorry Something is Missing"}
						</h1>
						<p className="mx-auto mt-4 max-w-md text-center text-lg leading-relaxed font-light md:text-xl">
							{page?.description ??
								"The link you clicked may be broken or the page may have been removed."}
						</p>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
							<Button className="px-6 md:px-14" asChild>
								<Link href="/">Go Home</Link>
							</Button>
							<GoBackButton className="px-6 md:px-14" variant="light">
								<ArrowLeft />
								<span>Go Back</span>
							</GoBackButton>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default NotFoundPage;
