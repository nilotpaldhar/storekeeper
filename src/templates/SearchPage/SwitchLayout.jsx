import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProductCatalogLayout } from '@store/slices/layout';
import { selectProductCatalogLayout } from '@store/slices/layout/layout.selectors';

/** Components & Icons. */
import RegularButton from '@ui/buttons/RegularButton';
import LayoutListIcon from '@icons/regular/LayoutList';
import LayoutGridIcon from '@icons/regular/LayoutGrid';

import clsx from 'clsx';

/**
 * Render the SwitchLayout component.
 *
 * @return {Element} The SwitchLayout component.
 */
const SwitchLayout = ({ className }) => {
	const dispatch = useDispatch();
	const layout = useSelector(selectProductCatalogLayout);

	return (
		<div className={className}>
			<RegularButton
				startIcon={LayoutListIcon}
				intent="dark-ghost"
				className={clsx('!px-0', layout === 'grid' && 'opacity-30')}
				onClick={() => {
					dispatch(toggleProductCatalogLayout('list'));
				}}
			/>
			<RegularButton
				startIcon={LayoutGridIcon}
				intent="dark-ghost"
				className={clsx('!px-0', layout === 'list' && 'opacity-30')}
				onClick={() => {
					dispatch(toggleProductCatalogLayout('grid'));
				}}
			/>
		</div>
	);
};

/**
 * Default Props.
 */
SwitchLayout.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
SwitchLayout.propTypes = {
	className: PropTypes.string,
};

export default SwitchLayout;
