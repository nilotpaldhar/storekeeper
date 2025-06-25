"use client";

import type { HeaderDropdownItem } from "@/types/ui.types";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { HeaderNavLink } from "@/app/(storefront)/_components/header/header-nav-link";

import { cn } from "@/utils/general/cn";

type HeaderMobileMenuDropdownProps = HeaderDropdownItem & {
	className?: string;
};

const HeaderMobileMenuDropdown = ({
	label,
	dropDownItems: items,
}: HeaderMobileMenuDropdownProps) => {
	const itemClassNames =
		"w-full px-5 py-2 text-neutral-900 hover:bg-neutral-50 hover:text-current focus-visible:outline-primary-600 focus-visible:text-primary-600";

	return (
		<Collapsible.Root className="group w-full">
			<Collapsible.Trigger asChild>
				<button
					type="button"
					className={cn(
						"flex cursor-pointer items-center justify-between text-sm font-medium",
						itemClassNames
					)}
				>
					<span>{label}</span>
					<ChevronDown
						size={12}
						aria-hidden="true"
						className="relative transition duration-300 group-data-[state=open]:rotate-180"
					/>
				</button>
			</Collapsible.Trigger>
			<Collapsible.Content>
				<ul>
					{items?.map((item) => (
						<li key={item.refKey}>
							<HeaderNavLink
								{...item}
								className={cn(itemClassNames, "block px-8 text-sm font-light text-neutral-700")}
							/>
						</li>
					))}
				</ul>
			</Collapsible.Content>
		</Collapsible.Root>
	);
};

export { HeaderMobileMenuDropdown };
