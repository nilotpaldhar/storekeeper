"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck, CircleX, Info, XIcon } from "lucide-react";

import { cn } from "@/lib/utils/general/cn";
import { useToggle } from "@/hooks/common/use-toggle";

const alertVariants = cva("  relative flex items-center px-4 py-2 space-x-2", {
	variants: {
		variant: {
			info: "bg-primary-50 text-primary-600",
			success: "bg-success-50 text-success-600",
			warning: "bg-warning-50 text-warning-700",
			error: "bg-error-50 text-error-600",
		},
		closable: {
			true: "pr-14",
			false: "pr-4",
		},
		align: {
			left: "justify-start",
			center: "justify-center",
			right: "justify-end",
		},
	},
	defaultVariants: {
		variant: "info",
		closable: true,
		align: "left",
	},
});

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof alertVariants> & {
		closable?: boolean;
	};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	({ closable = true, className, children, variant, align, ...props }, ref) => {
		const [show, toggle] = useToggle(true);

		return show ? (
			<div
				ref={ref}
				role="alert"
				className={cn(alertVariants({ className, variant, align, closable }))}
				{...props}
			>
				{variant === "info" && <Info size={18} className="shrink-0" />}
				{variant === "success" && <CircleCheck size={18} className="shrink-0" />}
				{variant === "warning" && <CircleAlert size={18} className="shrink-0" />}
				{variant === "error" && <CircleX size={18} className="shrink-0" />}
				<div className="text-sm font-semibold">{children}</div>
				{closable && (
					<button
						type="button"
						tabIndex={0}
						onClick={toggle}
						className="absolute top-1/2 right-4 flex h-5 w-5 shrink-0 -translate-y-2/4 transform cursor-pointer items-center justify-center rounded-full text-current transition duration-300 hover:text-current hover:opacity-70 focus-visible:outline-current focus-visible:outline-dashed"
					>
						<span className="sr-only">Close Alert</span>
						<XIcon size={16} />
					</button>
				)}
			</div>
		) : null;
	}
);
Alert.displayName = "Alert";

export { Alert };
