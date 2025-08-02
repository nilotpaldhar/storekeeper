export type TaxonomySeed = {
	id: string;
	title: string;
	slug: string;
	description: string;
	imageUrl: string;
	alt: string;
};

export type TaxonSeed = {
	id: string;
	title: string;
	slug: string;
	description: string;
	taxonomy: string;
};

export type BrandSeed = {
	id: string;
	title: string;
	slug: string;
	description: string;
};

export type ProductSeed = {
	id: string;
	title: string;
	slug: string;
	description: string;
	taxon: string;
	brand: string;
	inventory: number;
	pricing: {
		originalPrice: number;
		discountedPrice: number;
	};
	gallery: string[];
	specifications: {
		key: string;
		label: string;
		value: string;
	}[];
	relatedProducts: {
		key: string;
		ref: string;
	}[];
	sku: {
		name: string;
		code: string;
		weight: number;
		hs_tariff_number: string;
	};
};

export type ShippingCategorySeed = {
	name: string;
	code: string;
};
