"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/utils/general/cn";

const Select = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) => (
	<SelectPrimitive.Root data-slot="select" {...props} />
);

const SelectGroup = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) => (
	<SelectPrimitive.Group data-slot="select-group" {...props} />
);

const SelectValue = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) => (
	<SelectPrimitive.Value data-slot="select-value" {...props} />
);

const SelectTrigger = ({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: "sm" | "default";
}) => (
	<SelectPrimitive.Trigger
		data-slot="select-trigger"
		data-size={size}
		className={cn(
			"focus-visible:ring-primary-600 file:text-foreground border-input selection:bg-primary-600 flex w-fit min-w-0 items-center justify-between gap-2 rounded-none border bg-transparent px-3 text-sm whitespace-nowrap transition-colors outline-none selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
			"data-[size=default]:h-10 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-neutral-500",
			"aria-invalid:ring-error-600 aria-invalid:border-error-600",
			className
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<ChevronDownIcon className="size-4 opacity-50" />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
);

const SelectContent = ({
	className,
	children,
	position = "popper",
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			data-slot="select-content"
			className={cn(
				"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-none border shadow-md",
				position === "popper" &&
					"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
				className
			)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton />
			<SelectPrimitive.Viewport
				className={cn(
					"p-1",
					position === "popper" &&
						"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
			<SelectScrollDownButton />
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
);

const SelectLabel = ({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => (
	<SelectPrimitive.Label
		data-slot="select-label"
		className={cn("px-2 py-1.5 text-xs font-medium text-neutral-900", className)}
		{...props}
	/>
);

const SelectItem = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => (
	<SelectPrimitive.Item
		data-slot="select-item"
		className={cn(
			"relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-neutral-500 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
			className
		)}
		{...props}
	>
		<span className="absolute right-2 flex size-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<CheckIcon className="size-4" />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
);

const SelectSeparator = ({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => (
	<SelectPrimitive.Separator
		data-slot="select-separator"
		className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
		{...props}
	/>
);

const SelectScrollUpButton = ({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
	<SelectPrimitive.ScrollUpButton
		data-slot="select-scroll-up-button"
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronUpIcon className="size-4" />
	</SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton = ({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
	<SelectPrimitive.ScrollDownButton
		data-slot="select-scroll-down-button"
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronDownIcon className="size-4" />
	</SelectPrimitive.ScrollDownButton>
);

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
