import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document Types
import product from './documents/product';
import category from './documents/category';
import seoSettings from './documents/settings-seo';
import promoSettings from './documents/settings-promo';
import cookieSettings from './documents/settings-cookie';
import socialSettings from './documents/settings-social';
import generalSettings from './documents/settings-general';

// Object Types
import asset from './objects/asset';
import breadcrumb from './objects/breadcrumb';

import productPrice from './objects/product-price';
import productVariant from './objects/product-variant';
import productInventory from './objects/product-inventory';
import productConditionals from './objects/product-conditionals';

/*  ------------------------------------------ */
/*  Your Schema documents / objects
/*  ------------------------------------------ */
export default createSchema({
	// The name of our schema
	name: 'default',

	types: schemaTypes.concat([
		/* ----------------- */
		/* 1: Document types */
		product,
		category,
		seoSettings,
		promoSettings,
		cookieSettings,
		socialSettings,
		generalSettings,

		/* ----------------------- */
		/* 3: Generic & Commerce Object types */
		asset,
		breadcrumb,
		productPrice,
		productVariant,
		productInventory,
		productConditionals,
	]),
});
