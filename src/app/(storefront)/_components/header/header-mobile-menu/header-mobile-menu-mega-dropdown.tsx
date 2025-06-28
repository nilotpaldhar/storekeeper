"use client";

import type { HeaderMegaDropdownItem } from "@/types/ui.types";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { HeaderNavLink } from "@/app/(storefront)/_components/header/header-nav-link";

import { cn } from "@/lib/utils/general/cn";

type HeaderMobileMenuMegaDropdownProps = {
	items: HeaderMegaDropdownItem[];
	className?: string;
};

const HeaderMobileMenuMegaDropdown = ({ items }: HeaderMobileMenuMegaDropdownProps) => {
	const itemClassNames =
		"w-full px-5 py-2 text-neutral-900 hover:bg-neutral-50 hover:text-current focus-visible:outline-primary-600 focus-visible:text-primary-600";

	return (
		<div className="">
			{items.map((item) => (
				<Collapsible.Root key={item.refKey} className="group w-full">
					<Collapsible.Trigger asChild>
						<button
							type="button"
							className={cn(
								"flex cursor-pointer items-center justify-between text-sm font-medium",
								itemClassNames
							)}
						>
							<span>{item.label}</span>
							<ChevronDown
								size={12}
								aria-hidden="true"
								className="relative transition duration-300 group-data-[state=open]:rotate-180"
							/>
						</button>
					</Collapsible.Trigger>
					<Collapsible.Content>
						<ul className="flex flex-col space-y-2">
							{item.columns.map((column) => (
								<li key={column.key}>
									<span className="block border-b border-neutral-50 px-8 py-2 text-sm font-medium text-neutral-900">
										{column.heading}
									</span>
									<ul>
										{column.items.map((columnItem) => (
											<li key={columnItem.refKey}>
												<HeaderNavLink
													{...columnItem}
													className={cn(
														itemClassNames,
														"block px-12 text-sm font-light text-neutral-700"
													)}
												/>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</Collapsible.Content>
				</Collapsible.Root>
			))}
		</div>
	);
};

export { HeaderMobileMenuMegaDropdown };
