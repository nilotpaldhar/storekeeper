// Document Types
import page from './documents/page';
import menu from './documents/menu';
import brand from './documents/brand';
import product from './documents/product';
import category from './documents/category';
import homepage from './documents/homepage';
import loginpage from './documents/loginpage';
import errorpage from './documents/errorpage';
import searchpage from './documents/searchpage';
import seoSettings from './documents/settings-seo';
import productColor from './documents/product-color';
import promoSettings from './documents/settings-promo';
import headerSettings from './documents/settings-header';
import footerSettings from './documents/settings-footer';
import cookieSettings from './documents/settings-cookie';
import socialSettings from './documents/settings-social';
import generalSettings from './documents/settings-general';

// Document types (User/Auth)
import user from './documents/user';
import account from './documents/account';
import verificationToken from './documents/verificationToken';

// Object Types
import seo from './objects/seo';
import asset from './objects/asset';
import offer from './objects/offer';
import content from './objects/content';
import dropdown from './objects/dropdown';
import breadcrumb from './objects/breadcrumb';
import pageSection from './objects/page-section';

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
const schema = [
	/* ----------------- */
	/* 1: Document types */
	page,
	menu,
	brand,
	product,
	category,
	homepage,
	loginpage,
	errorpage,
	searchpage,
	seoSettings,
	productColor,
	promoSettings,
	headerSettings,
	footerSettings,
	cookieSettings,
	socialSettings,
	generalSettings,

	/* ------------------------------------ */
	/* 2: Document types (User/Auth) */
	user,
	account,
	verificationToken,

	/* ----------------------- */
	/* 3: Generic Object types */
	seo,
	asset,
	offer,
	content,
	dropdown,
	breadcrumb,
	pageSection,

	/* ----------------------- */
	/* 4: Navigation Object types */
	navLink,
	navPage,
	navProduct,
	navCategory,
	navDropdown,

	/* ----------------------- */
	/* 5: Commerce Object types */
	productPrice,
	productVariant,
	productInventory,
	productConditionals,
];

export default schema;
