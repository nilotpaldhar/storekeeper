"use client";

import * as Collapsible from "@radix-ui/react-collapsible";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/general/cn";

const CheckoutStepsAccordion = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex flex-col space-y-5">{children}</div>;
};

const CheckoutStepsAccordionPanel = ({
	open = false,
	title,
	disabled = false,
	onOpenChange = () => {},
	children,
}: {
	open?: boolean;
	title: string;
	disabled?: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}) => {
	return (
		<Collapsible.Root className="group" open={open} onOpenChange={onOpenChange}>
			<div className={cn("border border-dashed border-neutral-200")}>
				<div
					className={cn(
						"flex items-center justify-between border-b border-dashed px-5 py-3 transition-colors duration-75",
						open ? "border-neutral-200" : "border-transparent"
					)}
				>
					<h2 className={cn("text-sm font-bold")}>{title}</h2>
					<Collapsible.Trigger asChild>
						<Button variant="primary-ghost" className="h-6 px-0 text-xs" disabled={disabled}>
							Change
						</Button>
					</Collapsible.Trigger>
				</div>
				<Collapsible.Content className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
					<div className="p-5">{children}</div>
				</Collapsible.Content>
			</div>
		</Collapsible.Root>
	);
};

export { CheckoutStepsAccordion, CheckoutStepsAccordionPanel };
