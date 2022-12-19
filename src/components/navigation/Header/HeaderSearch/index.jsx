import PropTypes from 'prop-types';
import SearchIcon from '@icons/regular/Search';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the HeaderSearch component.
 *
 * @return {Element} The HeaderSearch component.
 */
const HeaderSearch = ({ className, ...props }) => {
	const classNames = clsx(
		'flex items-center lg:max-w-md xxl:max-w-sm w-max lg:w-full h-full',
		className
	);

	return (
		<div className={classNames} {...props}>
			<div className="hidden lg:flex items-center px-4 py-[10px] space-x-2 bg-white border select-none w-full border-neutral-100">
				<SearchIcon className="!text-base !text-neutral-400" />
				<span className="text-sm leading-none text-neutral-400">
					Search for products, brands and more
				</span>
			</div>
			<button
				type="button"
				className="flex items-center order-first h-full rounded lg:hidden text-neutral-900 hover:text-current focus-visible:outline-primary-600 focus-visible:text-primary-600"
			>
				<SearchIcon />
			</button>
		</div>
	);
};

/**
 * Default Props.
 */
HeaderSearch.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
HeaderSearch.propTypes = {
	className: PropTypes.string,
};

export default HeaderSearch;
