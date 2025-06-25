import { LucideIcon } from "lucide-react";
import Badge from "@/components/ui/badge";

import { cn } from "@/utils/general/cn";

type HeaderActionProps = React.ComponentProps<"button"> & {
	label: string;
	icon: LucideIcon;
	count?: number;
	className?: string;
};

const HeaderAction = ({ label, icon: Icon, count, className, ...props }: HeaderActionProps) => {
	return (
		<button
			type="button"
			className={cn(
				"focus-visible:text-primary-600 hover:text-primary-600 flex cursor-pointer flex-col items-center justify-center text-neutral-900 select-none focus-visible:outline-none",
				className
			)}
			{...props}
		>
			<Badge count={count} size="sm" offset={{ x: -8, y: -6 }}>
				<Icon size={18} />
			</Badge>
			<span className="sr-only text-[10px] leading-none font-semibold text-current uppercase lg:not-sr-only lg:mt-2">
				{label}
			</span>
		</button>
	);
};

export { HeaderAction };
