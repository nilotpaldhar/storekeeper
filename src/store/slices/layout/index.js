import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productCatalog: 'grid', // list or grid
};

/** Layout Slice. */
export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		toggleProductCatalogLayout: (state, action) => {
			if (action.payload) {
				state.productCatalog = action.payload;
			} else {
				state.productCatalog = state.productCatalog === 'list' ? 'grid' : 'list';
			}
		},
	},
});

/** Cart Actions. */
export const { toggleProductCatalogLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
