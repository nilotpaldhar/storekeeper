import type { Price, StockItem } from "@commercelayer/sdk";
import type { User } from "@prisma/client";

export type UserProfile = User;

export type ProductPrice = Price;
export type ProductInventory = StockItem;

export type ProductSku = {
	id: string;
	code: string | null;
	name: string | null;
	description: string | null;
	imageUrl: string | null;
	piecesPerPack: number | null;
	weight: number | null;
	unitOfWeight: string | null;
	hsTariffNumber: string | null;
};

export type ProductBrand = {
	id: string;
	title: string;
	slug: string;
};

export type ProductImage = {
	refKey: string;
	src: string | null;
	alt: string | null;
};

export type ProductOption = {
	refKey: string;
	name: string;
	values: Array<string>;
};

export type ProductVariant = {
	refKey: string;
	variantKey: string;
	sku: ProductSku | null;
	gallery: ProductImage[];
};

export type ProductSpecification = {
	refKey: string;
	label: string;
	value: string;
};

export type ProductBreadcrumb = {
	id: string;
	label: string;
	path: string;
}[];

export type ProductDetails = {
	title: string;
	slug: string;
	description: string | null;
	hasVariants: boolean;
	brand: ProductBrand | null;
	options: ProductOption[];
	variants: ProductVariant[];
	specifications: ProductSpecification[];
	sku: ProductSku | null;
	gallery: ProductImage[];
	breadcrumb: ProductBreadcrumb;
};
