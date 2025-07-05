"use client";

import { useToggle } from "@/hooks/common/use-toggle";
import { truncateStr } from "@/lib/utils/general/truncate-str";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type CollapsibleTextProps = {
	text: string;
	previewLength?: number;
	moreLabel?: string;
	lessLabel?: string;
	className?: string;
};

const CollapsibleText = ({
	text,
	previewLength = 100,
	moreLabel = "Read more",
	lessLabel = "Read less",
	className,
}: CollapsibleTextProps) => {
	const [isExpanded, toggleIsExpanded] = useToggle(false);
	const shortText = truncateStr({ str: text, maxChar: previewLength });
	const isHiddenBtn = text.length < previewLength;

	return (
		<div className={className}>
			<p>{isExpanded ? text : shortText}</p>
			{!isHiddenBtn ? (
				<Button
					variant="primary-ghost"
					className="h-max p-0 py-0"
					aria-expanded={isExpanded}
					onClick={toggleIsExpanded}
				>
					<span className="font-bold">{isExpanded ? lessLabel : moreLabel}</span>
					{isExpanded ? <ChevronUp /> : <ChevronDown />}
				</Button>
			) : null}
		</div>
	);
};

export { CollapsibleText };
