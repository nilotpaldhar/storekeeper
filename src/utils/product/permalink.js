import isEmpty from 'lodash-es/isEmpty';

/** Creates product permalink. */
export const createPermalink = (id = '', slug = null) => {
	if (isEmpty(id)) return null;
	const idSuffix = id?.split('_').slice(1).join('_');
	return isEmpty(slug) ? `${idSuffix}` : `${slug}-${idSuffix}`;
};

/** Parses product permalink. */
export const parsePermalink = (permalink = '') => {
	if (isEmpty(permalink)) return { slug: null, id: null };
	const permalinkArr = permalink?.split('-');
	const id = `prod_${permalinkArr?.pop()}`;
	const slug = permalinkArr?.length > 0 ? permalinkArr?.join('-') : null;
	return { id, slug };
};
