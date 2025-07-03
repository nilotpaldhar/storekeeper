import type { LucideIcon } from "lucide-react";

type StatusMessageProps = {
	icon?: LucideIcon;
	heading: React.ReactNode;
	children?: React.ReactNode;
};

const StatusMessage = ({ icon: Icon, heading, children }: StatusMessageProps) => (
	<div className="flex w-full flex-col space-y-4 rounded-sm border border-neutral-200 bg-gray-50 px-6 py-8">
		<div className="flex items-center justify-center space-x-3">
			{Icon && <Icon size={24} />}
			<h1 className="text-center text-xl font-semibold tracking-tight">{heading}</h1>
		</div>
		<div className="flex flex-col space-y-4 text-center text-base text-neutral-700">{children}</div>
	</div>
);

export { StatusMessage };
