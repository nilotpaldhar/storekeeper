import { cn } from "@/lib/utils/general/cn";

const ThreeDotsLoader = ({ className }: { className?: string }) => {
	const dotClassName = "animate-dot-bounce size-2 rounded-full bg-current";

	return (
		<div className={cn("text-primary-600 flex items-center justify-center space-x-2", className)}>
			<span className={dotClassName} style={{ animationDelay: "0s" }} />
			<span className={dotClassName} style={{ animationDelay: `0.2s` }} />
			<span className={dotClassName} style={{ animationDelay: `0.4s` }} />
		</div>
	);
};

export { ThreeDotsLoader };
