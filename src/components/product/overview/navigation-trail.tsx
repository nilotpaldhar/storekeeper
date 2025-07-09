import type { ProductBreadcrumb } from "@/types/domain.types";

import Link from "next/link";
import { Fragment } from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { cn } from "@/lib/utils/general/cn";

const NavigationTrail = ({ breadcrumb }: { breadcrumb: ProductBreadcrumb }) => {
	return (
		<Breadcrumb>
			<BreadcrumbList className="gap-1 sm:gap-1">
				{breadcrumb.map((item, idx) => {
					const isLastItem = idx === breadcrumb.length - 1;

					return (
						<Fragment key={item.id}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link
										href={item.path}
										className={cn(
											"font-normal text-neutral-900 hover:text-neutral-500",
											isLastItem && "font-bold"
										)}
									>
										{item.label}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{!isLastItem ? <BreadcrumbSeparator /> : null}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export { NavigationTrail };
