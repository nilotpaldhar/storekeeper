import { combineReducers } from '@reduxjs/toolkit';

/** Slices. */
import userReducer from '@store/slices/user';
import userAddressReducer from '@store/slices/userAddress';

import cartReducer from '@store/slices/cart';
import layoutReducer from '@store/slices/layout';
import cartOpsReducer from '@store/slices/cartOps';
import lastOrderReducer from '@store/slices/lastOrder';
import checkoutReducer from '@store/slices/checkout';
import checkoutStepsReducer from '@store/slices/checkoutSteps';

/** Root Reducer. */
export const rootReducer = combineReducers({
	user: userReducer,
	userAddress: userAddressReducer,

	cart: cartReducer,
	layout: layoutReducer,
	cartOps: cartOpsReducer,
	checkout: checkoutReducer,
	lastOrder: lastOrderReducer,
	checkoutSteps: checkoutStepsReducer,
});

export default rootReducer;
