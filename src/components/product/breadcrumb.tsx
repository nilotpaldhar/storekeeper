import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const ProductBreadcrumb = () => {
	return (
		<Breadcrumb>
			<BreadcrumbList className="gap-1 sm:gap-1">
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/" className="font-normal text-neutral-900 hover:text-neutral-500">
							Home
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/#" className="font-normal text-neutral-900 hover:text-neutral-500">
							Mobiles & Accessories
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/#" className="font-normal text-neutral-900 hover:text-neutral-500">
							Mobiles
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<BreadcrumbPage>SAMSUNG Mobiles</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export { ProductBreadcrumb };
