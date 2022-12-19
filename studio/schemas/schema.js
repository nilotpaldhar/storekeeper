import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document Types
import page from './documents/page';
import menu from './documents/menu';
import product from './documents/product';
import category from './documents/category';
import homepage from './documents/homepage';
import shoppage from './documents/shoppage';
import errorpage from './documents/errorpage';
import seoSettings from './documents/settings-seo';
import promoSettings from './documents/settings-promo';
import headerSettings from './documents/settings-header';
import footerSettings from './documents/settings-footer';
import cookieSettings from './documents/settings-cookie';
import socialSettings from './documents/settings-social';
import generalSettings from './documents/settings-general';

// Object Types
import seo from './objects/seo';
import asset from './objects/asset';
import dropdown from './objects/dropdown';
import breadcrumb from './objects/breadcrumb';

import navLink from './objects/nav-link';
import navPage from './objects/nav-page';
import navProduct from './objects/nav-product';
import navCategory from './objects/nav-category';
import navDropdown from './objects/nav-dropdown';

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
		page,
		menu,
		product,
		category,
		homepage,
		shoppage,
		errorpage,
		seoSettings,
		promoSettings,
		headerSettings,
		footerSettings,
		cookieSettings,
		socialSettings,
		generalSettings,

		/* ----------------------- */
		/* 2: Generic Object types */
		seo,
		asset,
		dropdown,
		breadcrumb,

		/* ----------------------- */
		/* 3: Navigation Object types */
		navLink,
		navPage,
		navProduct,
		navCategory,
		navDropdown,

		/* ----------------------- */
		/* 4: Commerce Object types */
		productPrice,
		productVariant,
		productInventory,
		productConditionals,
	]),
});
