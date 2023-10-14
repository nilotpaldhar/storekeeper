import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';

import RHFSelect from '@ui/data-entry/RHF/RHFSelect';

import getCountries from '@libs/commerce/services/getCountries';
import { fetchShippingCountries } from '@libs/commerce/checkout/helpers';

/**
 * Render the RegionField component.
 *
 * @return {Element} The RegionField component.
 */
const CountryField = ({ tokenId, isCheckout }) => {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(false);

	/** Fetch countries on mount */
	const fetchCountries = useCallback(async () => {
		setLoading(true);

		try {
			if (isCheckout && tokenId) {
				const data = await fetchShippingCountries(tokenId);
				setCountries(data);
				return;
			}

			const data = await getCountries();
			setCountries(data);
		} finally {
			setLoading(false);
		}
	}, [tokenId, isCheckout]);

	useEffect(() => {
		fetchCountries();
	}, [fetchCountries]);

	return (
		<RHFSelect
			required
			id="country"
			name="country"
			label="Country"
			wrapperClassName="col-span-2 sm:col-span-1"
			disabled={loading || countries?.length === 0}
			placeholder={loading ? 'Loading...' : 'Choose an option'}
			options={countries?.map(({ code, name }) => ({
				id: code,
				value: code,
				content: name,
			}))}
		/>
	);
};

/**
 * Default Props.
 */
CountryField.defaultProps = {
	tokenId: null,
	isCheckout: false,
};

/**
 * Prop Types.
 */
CountryField.propTypes = {
	tokenId: PropTypes.string,
	isCheckout: PropTypes.bool,
};

export default CountryField;
