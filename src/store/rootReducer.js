import { combineReducers } from '@reduxjs/toolkit';

/** Slices. */
import userReducer from '@store/slices/user';
import cartReducer from '@store/slices/cart';
import layoutReducer from '@store/slices/layout';
import cartOpsReducer from '@store/slices/cartOps';
import checkoutReducer from '@store/slices/checkout';

/** Root Reducer. */
export const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	layout: layoutReducer,
	cartOps: cartOpsReducer,
	checkout: checkoutReducer,
});

export default rootReducer;
