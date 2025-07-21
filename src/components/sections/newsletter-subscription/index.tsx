"use client";

import { Send } from "lucide-react";

import { NewsletterForm } from "@/components/sections/newsletter-subscription/form";
import { Container } from "@/components/ui/container";

import { notifyFeatureUnavailable } from "@/lib/utils/toast";

const NewsletterSubscription = () => {
	return (
		<div className="bg-primary-50 bg-gradient-to-b from-white to-[#F7FCFF] py-20">
			<Container>
				<div className="mx-auto md:max-w-lg lg:max-w-2xl">
					<div className="text-primary-600 mb-6 flex justify-center">
						<Send size={48} />
					</div>
					<div className="mx-auto mb-10 flex max-w-sm flex-col space-y-4 text-center sm:max-w-md">
						<h2 className="text-xl leading-tight font-medium tracking-widest text-current capitalize md:text-2xl">
							Subscribe to Our Newsletter
						</h2>
						<p className="tex text-sm leading-relaxed font-normal text-current md:text-base">
							Get updates, insights, and curated content delivered right to your inbox.
						</p>
					</div>
					<NewsletterForm
						onSubmit={() => notifyFeatureUnavailable({ featureName: "Newsletter" })}
					/>
				</div>
			</Container>
		</div>
	);
};

export { NewsletterSubscription };
