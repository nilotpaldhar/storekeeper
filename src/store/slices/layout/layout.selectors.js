import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectLayout = (state) => state.layout;
export const selectProductCatalogLayout = createDraftSafeSelector(
	selectLayout,
	({ productCatalog }) => productCatalog
);
