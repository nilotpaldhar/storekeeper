"use client";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils/general/cn";

type AutoCompleteItemProps = {
	label: string;
	icon: LucideIcon;
	actions?: React.ReactNode;
	children?: React.ReactNode;
	classNames?: {
		root?: string;
		button?: string;
		buttonContainer?: string;
		buttonIcon?: string;
		buttonLabel?: string;
		actionsContainer?: string;
	};
	onClick: () => void;
};

const AutoCompleteItem = ({
	label,
	icon: Icon,
	actions,
	children,
	classNames,
	onClick,
}: AutoCompleteItemProps) => {
	return (
		<div
			className={cn(
				"flex items-center px-5 transition-colors duration-300 hover:bg-neutral-50 lg:px-3",
				classNames?.root
			)}
		>
			<button
				className={cn(
					"flex flex-1 cursor-pointer items-center py-3 font-sans text-neutral-900",
					classNames?.button
				)}
				onClick={onClick}
			>
				<div className={cn("flex flex-1 items-center space-x-2", classNames?.buttonContainer)}>
					<Icon size={20} className={cn("text-neutral-400", classNames?.buttonIcon)} />
					<div
						title={label}
						className={cn(
							"truncate text-sm font-normal text-neutral-500 [&>mark]:bg-transparent [&>mark]:font-bold [&>mark]:text-neutral-900",
							classNames?.buttonLabel
						)}
					>
						{children}
					</div>
				</div>
			</button>
			{actions ? <div className={cn(classNames?.actionsContainer)}>{actions}</div> : null}
		</div>
	);
};

export { AutoCompleteItem };
