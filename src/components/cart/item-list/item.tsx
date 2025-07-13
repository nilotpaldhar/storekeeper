"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

const demoImgUrl = `https://cdn.sanity.io/images/nih7t95s/development/f509d35ef73dd5b716b73a5dbb6edc36d99cbe6e-400x400.png`;
const demoTitle = `Noise Buds VS102 Truly Wireless Bluetooth Headset  (Matt Black, True Wireless)`;

const CartItem = () => {
	return (
		<div className="grid grid-cols-[minmax(0,140px)_1fr] gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,160px)_1fr]">
			<div className="xs:col-span-1 xs:pr-0 xs:pl-5 col-span-full px-3">
				<div className="flex aspect-square items-center justify-center overflow-hidden rounded-xs bg-neutral-50">
					<Image src={demoImgUrl} alt="product image" width={125} height={125} />
				</div>
			</div>
			<div className="xs:col-span-1 xs:pr-5 xs:pl-0 col-span-full px-3">
				<div className="space-y-2 pt-1">
					<h2 className="line-clamp-2">
						<Link
							href="#"
							title={demoTitle}
							target="_blank"
							rel="noopener noreferrer"
							className="block text-sm font-medium text-neutral-900 hover:text-neutral-500 lg:text-base"
						>
							{demoTitle}
						</Link>
					</h2>

					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<p className="space-x-2 text-xs">
							<span className="inline-block font-light text-neutral-500">Color:</span>
							<span className="inline-block bg-neutral-50 p-1 font-medium">Blue</span>
						</p>
						<p className="space-x-2 text-xs">
							<span className="inline-block font-light text-neutral-500">Storage:</span>
							<span className="inline-block bg-neutral-50 p-1 font-medium">512 GB</span>
						</p>
					</div>

					<div className="flex items-center space-x-6 md:pt-2.5">
						<p className="space-x-2 text-sm">
							<span className="inline-block text-neutral-500">Price:</span>
							<span className="inline-block font-medium">$285.00</span>
						</p>
						<p className="space-x-2 text-sm">
							<span className="inline-block text-neutral-500">Total:</span>
							<span className="inline-block font-medium">$285.00</span>
						</p>
					</div>
				</div>
			</div>
			<div className="xs:pr-0 xs:pl-5 col-span-full px-3 sm:col-span-1">
				<QuantityStepper max={10} />
			</div>
			<div className="col-span-full pt-3 sm:col-span-1 sm:pt-0">
				<div className="flex items-center gap-4 border-t border-dashed border-neutral-200 sm:border-none">
					<Button variant="primary-ghost" className="h-10 flex-1 p-px font-bold sm:max-w-max">
						SAVE FOR LATER
					</Button>
					<span
						className="block h-10 w-1 border-r border-dashed border-neutral-200 sm:hidden"
						role="separator"
					></span>
					<Button variant="error-ghost" className="h-10 flex-1 p-px font-bold sm:max-w-max">
						REMOVE
					</Button>
				</div>
			</div>
		</div>
	);
};

export { CartItem };
