import Image from "next/image";

import { cn } from "@/utils/general/cn";
import { ILLUSTRATIONS } from "@/constants/media";

const Empty = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex max-w-md flex-col items-center text-center text-neutral-900", className)}
		{...props}
	/>
);
Empty.displayName = "Empty";

const EmptyImage = ({
	src = ILLUSTRATIONS.EMPTY_STATES.EMPTY,
	alt = "empty",
	width = 100,
	height = 63,
}: {
	src?: string;
	alt?: string;
	width?: number;
	height?: number;
}) => (
	<div className="mb-6">
		<Image src={src} alt={alt} width={width} height={height} />
	</div>
);
EmptyImage.displayName = "EmptyImage";

const EmptyTitle = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h2 className={cn("text-lg leading-normal font-bold", className)} {...props}>
		{children}
	</h2>
);
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("mt-2 text-sm leading-relaxed font-light", className)} {...props} />
);
EmptyDescription.displayName = "EmptyDescription";

const EmptyContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("mt-6 leading-relaxed", className)} {...props} />
);
EmptyContent.displayName = "EmptyContent";

export { Empty, EmptyImage, EmptyTitle, EmptyDescription, EmptyContent };
