import type { HeaderNavLinkType } from "@/types/ui.types";

import { cva } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils/general/cn";
import { openInNewTab } from "@/lib/utils/general/open-in-new-tab";
import { removeLeadingSlash } from "@/lib/utils/general/remove-leading-slash";

type HeaderNavLinkProps = HeaderNavLinkType & {
	className?: string;
};

const resolveHrefFromType = ({
	linkType,
	href,
}: {
	linkType: HeaderNavLinkType["type"];
	href: string | null;
}): string => {
	const hrefWithoutLeadingSlash = href ? removeLeadingSlash(href) : "#";

	if (linkType === "navLink" || linkType === "navPage") {
		return hrefWithoutLeadingSlash;
	}

	if (linkType === "navProduct") {
		return `products/${hrefWithoutLeadingSlash}`;
	}

	if (linkType === "navTaxon" || linkType === "navTaxonomy") {
		return `categories/${hrefWithoutLeadingSlash}`;
	}

	return hrefWithoutLeadingSlash;
};

const headerNavLinkStyle = cva([
	"relative flex h-full items-center p-px text-sm font-medium text-neutral-900 hover:text-primary-600 transition select-none cursor-pointer focus-visible:text-primary-600 focus-visible:outline-none",
]);

const HeaderNavLink = ({ type, href, isExternal, label, className }: HeaderNavLinkProps) => {
	const resolvedHref = resolveHrefFromType({ linkType: type, href });

	if (isExternal) {
		<button
			type="button"
			onClick={() => openInNewTab(resolvedHref)}
			className={cn(headerNavLinkStyle(), className)}
		>
			{label}
		</button>;
	}

	return (
		<Link href={`/${resolvedHref}`} className={cn(headerNavLinkStyle(), className)}>
			{label}
		</Link>
	);
};

export { HeaderNavLink, headerNavLinkStyle };
