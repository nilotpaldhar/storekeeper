import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '@store/rootReducer';

export const store = () =>
	configureStore({
		reducer: rootReducer,
		// devTools: process.env.NODE_ENV === 'development',
		devTools: true,
	});

/** Next Redux Wrapper. */
export const wrapper = createWrapper(store);

export default store;
