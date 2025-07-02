"use client";

import type { FooterMenuLink } from "@/types/ui.types";

import Link from "next/link";

import { openInNewTab } from "@/lib/utils/general/open-in-new-tab";
import { removeLeadingSlash } from "@/lib/utils/general/remove-leading-slash";

type FooterNavLinkWithIcon = FooterMenuLink & { icon?: React.ReactNode };

type FooterMenuProps = {
	title: string;
	menuLinks: FooterNavLinkWithIcon[];
};

const FooterMenu = ({ title, menuLinks }: FooterMenuProps) => {
	const menuLinkClassName = `py-1 text-sm font-normal leading-none text-inherit hover:text-neutral-300 focus-visible:outline-neutral-400 cursor-pointer`;

	return (
		<div>
			<h4 className="text-xs leading-none font-light text-neutral-300 uppercase">{title}</h4>
			<nav className="mt-5">
				<ul className="flex flex-col gap-2">
					{menuLinks.map(({ key, label, href, isExternal, icon }) => (
						<li key={key} className="flex items-center space-x-2">
							{icon}
							{isExternal ? (
								<button onClick={() => openInNewTab(href)} className={menuLinkClassName}>
									{label}
								</button>
							) : (
								<Link href={href ? removeLeadingSlash(href) : "#"} className={menuLinkClassName}>
									{label}
								</Link>
							)}
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export { FooterMenu };
