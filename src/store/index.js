import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '@store/rootReducer';

const isdevToolsAvailable = () => {
	if (process.env.NEXT_PUBLIC_REDUX_DEV_TOOLS === 'on') return true;
	if (process.env.NODE_ENV === 'development') return true;
	return false;
};

export const store = () =>
	configureStore({
		reducer: rootReducer,
		devTools: isdevToolsAvailable(),
	});

/** Next Redux Wrapper. */
export const wrapper = createWrapper(store);

export default store;
