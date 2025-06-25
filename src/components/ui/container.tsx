import { cn } from "@/utils/general/cn";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva("px-4 mx-auto w-full", {
	variants: {
		fluid: {
			true: "max-w-full",
			false:
				"sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]",
		},
	},
	defaultVariants: {
		fluid: false,
	},
});

const Container = ({
	className,
	fluid,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) => {
	return <div className={cn(containerVariants({ fluid, className }))} {...props} />;
};
Container.displayName = "Container";

export { Container };
