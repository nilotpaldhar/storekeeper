"use client";

import type { HeaderDropdownItem } from "@/types/ui.types";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	HeaderNavLink,
	headerNavLinkStyle,
} from "@/app/(storefront)/_components/header/header-nav-link";
import { cn } from "@/utils/general/cn";
import { ChevronDownIcon } from "lucide-react";

type HeaderDesktopMenuDropdownProps = HeaderDropdownItem & {
	className?: string;
};

const HeaderDesktopMenuDropdown = ({
	label,
	dropDownItems: items,
}: HeaderDesktopMenuDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={cn(headerNavLinkStyle(), "group flex items-center space-x-0.5")}
				>
					<span>{label}</span>
					<ChevronDownIcon
						className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
						aria-hidden="true"
					/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 rounded-xs p-0" align="center" sideOffset={12}>
				{items.map((dropDownItem) => (
					<DropdownMenuItem
						key={dropDownItem.refKey}
						className="rounded-none border-b border-b-neutral-50 px-4 py-2 hover:bg-neutral-100"
					>
						<HeaderNavLink className="cursor-pointer" {...dropDownItem} />
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { HeaderDesktopMenuDropdown };
