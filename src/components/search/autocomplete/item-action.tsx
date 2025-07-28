"use client";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils/general/cn";

type AutoCompleteItemActionProps = React.ComponentProps<"button"> & {
	label: string;
	icon: LucideIcon;
};

const AutoCompleteItemAction = ({
	label,
	icon: Icon,
	className,
	onClick,
}: AutoCompleteItemActionProps) => {
	return (
		<button
			type="button"
			title={label}
			aria-label={label}
			className={cn(
				"flex h-full cursor-pointer items-center justify-center py-3 text-neutral-500",
				className
			)}
			onClick={onClick}
		>
			<Icon size={14} />
		</button>
	);
};

export { AutoCompleteItemAction };
