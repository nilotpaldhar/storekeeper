"use client";

import {
	TwitterShareButton,
	EmailShareButton,
	WhatsappShareButton,
	TwitterIcon,
	WhatsappIcon,
	EmailIcon,
} from "next-share";
import { Link, Share2 } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { env } from "@/lib/config/env";
import { useCopy } from "@/hooks/common/use-copy";
import { cn } from "@/lib/utils/general/cn";

type ProductSharePopoverProps = {
	url: string;
	title: string;
};

const ProductSharePopover = ({ url, title }: ProductSharePopoverProps) => {
	const { copy, isCopied } = useCopy({ str: url });

	const titlePrefix = `I ❤ this product on ${env.NEXT_PUBLIC_SITE_TITLE}!`;
	const prefixedTitle = `${titlePrefix} ${title}`;

	const btnContainerClassName = "flex items-center px-2 py-2 border-b border-neutral-200";
	const btnWrapperClassName = "flex items-center space-x-2 text-neutral-900";
	const btnIconClassName = "size-5 rounded-full";
	const btnTextClassName = "text-sm font-semibold";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="light-ghost" className="h-max p-0">
					<Share2 size={16} />
					<span className="font-bold">Share</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent sideOffset={12} className="w-40 rounded-xs p-0">
				<div className={btnContainerClassName}>
					<TwitterShareButton url={url} title={prefixedTitle}>
						<div className={btnWrapperClassName}>
							<TwitterIcon className={btnIconClassName} />
							<span className={btnTextClassName}>Twitter/X</span>
						</div>
					</TwitterShareButton>
				</div>

				<div className={btnContainerClassName}>
					<WhatsappShareButton url={url} title={prefixedTitle}>
						<div className={btnWrapperClassName}>
							<WhatsappIcon className={btnIconClassName} />
							<span className={btnTextClassName}>Whatsapp</span>
						</div>
					</WhatsappShareButton>
				</div>

				<div className={btnContainerClassName}>
					<EmailShareButton url={url} subject={titlePrefix} body={`${title}. Here's the link`}>
						<div className={btnWrapperClassName}>
							<EmailIcon className={btnIconClassName} />
							<span className={btnTextClassName}>Email</span>
						</div>
					</EmailShareButton>
				</div>

				<div className={cn(btnContainerClassName, "border-transparent")}>
					<button type="button" onClick={() => copy()} className="cursor-pointer">
						<div className={btnWrapperClassName}>
							<Link className={btnIconClassName} />
							<span className={btnTextClassName}>{isCopied ? "Link Copied!" : "Copy Link"}</span>
						</div>
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export { ProductSharePopover };
