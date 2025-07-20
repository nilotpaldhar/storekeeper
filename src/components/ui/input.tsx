import * as React from "react";

import { cn } from "@/lib/utils/general/cn";

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"focus-visible:ring-primary-600 file:text-foreground selection:bg-primary-600 border-input flex h-10 w-full min-w-0 rounded-none border bg-transparent px-3 py-1 text-sm transition-colors outline-none selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"aria-invalid:ring-error-600 aria-invalid:border-error-600",
				className
			)}
			{...props}
		/>
	);
};

export { Input };
