import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/general/cn";

const badgeVariants = cva(
	[
		"absolute top-0 left-full overflow-hidden whitespace-nowrap rounded-full text-center text-white font-normal",
	],
	{
		variants: {
			size: {
				sm: "min-w-[16px] h-[16px] leading-[16px] text-[10px]",
				md: "min-w-[20px] h-[20px] leading-[20px] text-xs",
				lg: "min-w-[24px] h-[24px] leading-[24px] text-sm",
			},
			variant: {
				primary: "bg-primary-600",
				neutral: "bg-neutral-900",
				success: "bg-success-600",
				warning: "bg-warning-600",
				error: "bg-error-600",
			},
			singleDigit: {
				true: "p-0",
				false: "px-2",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "primary",
		},
	}
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
	count?: number;
	overflowCount?: number;
	size?: "sm" | "md" | "lg";
	offset: { x?: number; y?: number };
	children: React.ReactNode;
	classNames?: {
		root?: string;
		count?: string;
	};
};

const Badge = ({
	count = 0,
	overflowCount = 99,
	size = "md",
	offset = { x: -10, y: -10 },
	variant = "primary",
	children,
	classNames,
}: BadgeProps) => {
	const isOverflowing = count > overflowCount;
	const singleDigit = !isOverflowing && count < 10;
	const countStr = isOverflowing ? `${overflowCount}+` : `${count}`;

	return (
		<span className={cn("relative inline-block leading-none", classNames?.root)}>
			{children}
			{count > 0 && (
				<sup
					title={count.toString()}
					className={badgeVariants({ size, variant, singleDigit, className: classNames?.count })}
					style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
				>
					{countStr}
				</sup>
			)}
		</span>
	);
};

export default Badge;
