import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { useWatch } from 'react-hook-form';

import RHFSelect from '@ui/data-entry/RHF/RHFSelect';

import getSubDivisions from '@libs/commerce/services/getSubDivisions';
import { fetchShippingRegions } from '@libs/commerce/checkout/helpers';

/**
 * Render the RegionField component.
 *
 * @return {Element} The RegionField component.
 */
const RegionField = ({ tokenId, isCheckout, onFetch }) => {
	const country = useWatch({ name: 'country' });

	const [regions, setRegions] = useState([]);
	const [loading, setLoading] = useState(false);

	/** Fetch regions on mount */
	const fetchRegions = useCallback(
		async (countryCode) => {
			onFetch();
			setLoading(true);

			try {
				if (isCheckout && tokenId) {
					const data = await fetchShippingRegions(tokenId, countryCode);
					setRegions(data);
				}

				const data = await getSubDivisions(countryCode);
				setRegions(data);
			} finally {
				setLoading(false);
			}
		},
		[tokenId, isCheckout, onFetch]
	);

	useEffect(() => {
		if (country) fetchRegions(country?.split('-')?.[0]);
	}, [country, fetchRegions]);

	return (
		<RHFSelect
			required
			id="region"
			name="region"
			label="State / Region"
			wrapperClassName="col-span-2 sm:col-span-1"
			disabled={loading || regions?.length === 0}
			placeholder={loading ? 'Loading...' : 'Choose an option'}
			options={regions?.map(({ code, name }) => ({
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
RegionField.defaultProps = {
	tokenId: null,
	isCheckout: false,
	onFetch: () => {},
};

/**
 * Prop Types.
 */
RegionField.propTypes = {
	tokenId: PropTypes.string,
	isCheckout: PropTypes.bool,
	onFetch: PropTypes.func,
};

export default RegionField;
