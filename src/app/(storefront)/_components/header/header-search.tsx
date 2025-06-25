import { cn } from "@/utils/general/cn";

const HeaderSearch = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn("hidden w-full lg:flex lg:max-w-md lg:items-center 2xl:max-w-sm", className)}
		>
			<div className="flex h-10 w-full items-center border bg-neutral-50 px-5">
				<span className="text-sm font-light text-neutral-500">
					Search for products, brands and more
				</span>
			</div>
		</div>
	);
};

export { HeaderSearch };
