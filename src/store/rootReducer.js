import { combineReducers } from '@reduxjs/toolkit';

/** Slices. */
import cartReducer from '@store/slices/cart';
import cartOpsReducer from '@store/slices/cartOps';

/** Root Reducer. */
export const rootReducer = combineReducers({
	cart: cartReducer,
	cartOps: cartOpsReducer,
});

export default rootReducer;
