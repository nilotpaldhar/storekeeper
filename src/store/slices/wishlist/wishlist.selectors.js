import isEmpty from 'lodash-es/isEmpty';

import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const selectWishlist = (state) => state.wishlist;

export const selectStatus = createDraftSafeSelector(selectWishlist, ({ status }) => status);

export const selectCount = createDraftSafeSelector(selectWishlist, ({ count }) => count);

export const selectContents = createDraftSafeSelector(selectWishlist, ({ contents }) => contents);

export const selectError = createDraftSafeSelector(selectWishlist, ({ error }) => error);

export const selectIsWishlisted = createDraftSafeSelector(
	[(state) => state.wishlist?.contents?.items, (_, id) => id],
	(items, itemId) => {
		if (!isEmpty(items) && !isEmpty(itemId)) {
			const itemIndex = items?.findIndex((item) => item?.id === itemId);
			return itemIndex !== -1;
		}
		return false;
	}
);
