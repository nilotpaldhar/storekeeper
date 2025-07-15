import type { LineItem, Order, Price, StockItem } from "@commercelayer/sdk";
import type { User } from "@prisma/client";

export type OperationResult<TData = undefined, TReason extends string = "UNKNOWN"> =
	| { ok: true; data?: TData }
	| { ok: false; reason: TReason; detail?: string };

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
	id: string;
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

export type ProductSummary = {
	id: string;
	title: string;
	slug: string;
	category: string;
	description: string | null;
	hasVariants: boolean;
	variants: ProductVariant[];
	sku: ProductSku | null;
	gallery: ProductImage[];
	price: ProductPrice | null;
};

export type Cart = Order;

export type CartCount = Pick<Order, "skus_count">;

export type CartSummary = Pick<
	Order,
	| "id"
	| "type"
	| "number"
	| "formatted_subtotal_amount"
	| "formatted_shipping_amount"
	| "formatted_discount_amount"
	| "formatted_gift_card_amount"
	| "formatted_total_tax_amount"
	| "formatted_total_amount_with_taxes"
	| "skus_count"
>;

export type CartLineItem = Pick<
	LineItem,
	| "id"
	| "type"
	| "sku_code"
	| "sku"
	| "name"
	| "quantity"
	| "currency_code"
	| "formatted_unit_amount"
	| "formatted_compare_at_amount"
	| "formatted_options_amount"
	| "formatted_discount"
	| "formatted_total_amount"
	| "formatted_tax_amount"
> & {
	product: {
		id: string;
		title: string;
		slug: string;
		thumbnail: {
			src: string | null;
			alt?: string | null;
		} | null;
	} | null;
};
