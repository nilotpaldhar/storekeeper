import PropTypes from 'prop-types';

/**
 * Render the ProductSpecs component.
 *
 * @return {Element} The ProductSpecs component.
 */
const ProductSpecs = ({ list }) => (
	<ul className="flex flex-col space-y-3 text-sm md:text-base list-disc">
		{list.map((item) => (
			<li
				key={item.key}
				className="flex flex-col space-y-1 space-x-4 sm:flex-row sm:space-y-0 sm:items-start sm:space-x-6"
			>
				<div className="flex items-center gap-3 sm:w-40 md:w-52 font-semibold before:bg-neutral-900 before:block before:w-1 before:h-1 before:rounded-full">
					{item.name}
				</div>
				<div className="flex-1 font-light">{item.value}</div>
			</li>
		))}
	</ul>
);

/**
 * Default Props.
 */
ProductSpecs.defaultProps = {
	list: [],
};

/**
 * Prop Types.
 */
ProductSpecs.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ProductSpecs;
