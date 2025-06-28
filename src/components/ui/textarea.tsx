import * as React from "react";

import { cn } from "@/lib/utils/general/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"focus-visible:ring-primary-600 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex field-sizing-content h-10 min-h-16 w-full min-w-0 rounded-none border bg-transparent px-3 py-1 text-sm transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"aria-invalid:ring-error-600 aria-invalid:border-error-600",
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };
