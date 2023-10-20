import { combineReducers } from '@reduxjs/toolkit';

/** Slices. */
import layoutReducer from '@store/slices/layout';

import userReducer from '@store/slices/user';
import userAddressReducer from '@store/slices/userAddress';

import cartReducer from '@store/slices/cart';
import cartOpsReducer from '@store/slices/cartOps';
import wishlistReducer from '@store/slices/wishlist';
import wishlistOpsReducer from '@store/slices/wishlistOps';

import lastOrderReducer from '@store/slices/lastOrder';
import checkoutReducer from '@store/slices/checkout';
import checkoutStepsReducer from '@store/slices/checkoutSteps';

/** Root Reducer. */
export const rootReducer = combineReducers({
	layout: layoutReducer,

	user: userReducer,
	userAddress: userAddressReducer,

	cart: cartReducer,
	cartOps: cartOpsReducer,
	wishlist: wishlistReducer,
	wishlistOps: wishlistOpsReducer,

	checkout: checkoutReducer,
	lastOrder: lastOrderReducer,
	checkoutSteps: checkoutStepsReducer,
});

export default rootReducer;
