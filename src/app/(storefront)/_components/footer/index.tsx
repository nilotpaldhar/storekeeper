import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SiteLogo } from "@/components/site-logo";

import { FooterMenu } from "@/app/(storefront)/_components/footer/footer-menu";
import { FooterSocialLink } from "@/app/(storefront)/_components/footer/footer-social-link";

import { getSanityImageUrl } from "@/lib/sanity/image";
import { getFooterSettings } from "@/lib/settings/fetch";

const Footer = async () => {
	const footerSettings = await getFooterSettings();
	const { site, info, social, blockOne, blockTwo, blockThree } = footerSettings ?? {};
	const logoSrc = site?.logo ? getSanityImageUrl(site.logo).url() : null;

	return (
		<footer className="w-full bg-neutral-900 py-10 text-neutral-100 lg:pt-16 lg:pb-10">
			<Container>
				<div className="flex flex-col justify-between gap-10 xl:flex-row xl:gap-0">
					<div>
						<SiteLogo href="/" logoSrc={logoSrc} alt={site?.title} width={220} height={30} />
						{site?.description ? (
							<p className="mt-5 max-w-[40ch] text-sm leading-relaxed font-normal">
								{site.description}
							</p>
						) : null}
						{site?.readMore ? (
							<Link
								href={`/${site.readMore.link?.slug ?? "#"}`}
								className="mt-4 flex max-w-max items-center gap-2 text-sm font-medium text-inherit hover:text-neutral-300 focus:outline-neutral-600"
							>
								<span>{site.readMore.label ?? "Read More"}</span>
								<ArrowRight size={12} />
							</Link>
						) : null}
					</div>
					<FooterMenu title={blockOne?.title ?? "Company"} menuLinks={blockOne?.menus ?? []} />
					<FooterMenu title={blockTwo?.title ?? "Information"} menuLinks={blockTwo?.menus ?? []} />
					<FooterMenu title={blockThree?.title ?? "Account"} menuLinks={blockThree?.menus ?? []} />
					<FooterMenu
						title={info?.title ?? "Need Help?"}
						menuLinks={[
							{
								key: "email-link",
								type: "navLink",
								isExternal: false,
								label: `Email: ${info?.email ?? ""}`,
								href: `mailto:${info?.email ?? ""}`,
								icon: <Mail size={16} />,
							},
							{
								key: "phone-link",
								type: "navLink",
								isExternal: false,
								label: `Call Us: ${info?.email ?? ""}`,
								href: `tel:${info?.email ?? ""}`,
								icon: <Phone size={16} />,
							},
						]}
					/>
				</div>
				<hr className="my-10 border-t border-neutral-800 lg:mt-14 lg:mb-10" />
				<div className="flex flex-col items-center gap-5 xl:flex-row xl:justify-between xl:gap-0">
					{site?.copyright ? (
						<p className="text-center text-sm font-normal text-inherit">{site.copyright}</p>
					) : null}
					<div className="flex flex-wrap items-center justify-center gap-2">
						<FooterSocialLink
							platform="facebook"
							url={social?.facebook ?? null}
							srText="Instagram"
						/>
						<FooterSocialLink
							platform="instagram"
							url={social?.instagram ?? null}
							srText="Instagram"
						/>
						<FooterSocialLink platform="twitter" url={social?.twitter ?? null} srText="Twitter" />
						<FooterSocialLink platform="youtube" url={social?.youtube ?? null} srText="YouTube" />
					</div>
				</div>
			</Container>
		</footer>
	);
};

export { Footer };
