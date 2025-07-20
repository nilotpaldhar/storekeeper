import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils/general/cn";

const Stepper = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<nav className={cn(className)} {...props} />
);
Stepper.displayName = "Stepper";

const StepperList = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<ol className={cn("flex max-w-max items-center space-x-3", className)} {...props} />
);
StepperList.displayName = "StepperList";

const StepperItem = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<li
		className={cn(
			"flex items-center",
			"after:ml-3 after:h-px after:w-5 after:-translate-y-0.5 after:border-t after:border-dashed after:border-neutral-300 sm:after:w-10",
			"[&:last-child]:after:hidden",
			className
		)}
		{...props}
	/>
);
StepperItem.displayName = "StepperItem";

const StepperButton = ({
	className,
	active,
	asChild = false,
	...props
}: React.ComponentProps<"button"> & {
	active?: boolean;
	asChild?: boolean;
}) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(
				"cursor-pointer text-[8px] leading-none font-semibold tracking-normal text-neutral-900 uppercase transition duration-300 after:mt-1 after:block after:h-px after:w-full after:origin-left after:transition after:duration-300 disabled:pointer-events-none disabled:opacity-50 sm:text-xs",
				active
					? "text-primary-600 hover:text-primary-600 after:bg-primary-600 pointer-events-none after:scale-100 after:opacity-100"
					: "text-neutral-900 after:scale-0 after:bg-transparent after:opacity-0 hover:text-neutral-900",
				className
			)}
			{...props}
		/>
	);
};
StepperButton.displayName = "StepperButton";

export { Stepper, StepperList, StepperItem, StepperButton };
