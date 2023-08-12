import PropTypes from 'prop-types';

/**
 * Render the InfoItem component.
 *
 * @return {Element} The InfoItem component.
 */
const InfoItem = ({ icon: Icon, title, desc, className, ...props }) => (
	<div className={className} {...props}>
		<div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6 select-none">
			{Icon && (
				<div className="flex items-center text-primary-600">
					<Icon className="!text-4xl" />
				</div>
			)}
			<div className="flex flex-col space-y-2 text-neutral-900 leading-none text-sm text-center lg:text-left">
				<h3 className="font-bold truncate overflow-hidden">{title}</h3>
				<p className="font-normal truncate overflow-hidden">{desc}</p>
			</div>
		</div>
	</div>
);

/**
 * Default Props.
 */
InfoItem.defaultProps = {
	icon: '',
	title: '',
	desc: '',
	className: '',
};

/**
 * Prop Types.
 */
InfoItem.propTypes = {
	icon: PropTypes.elementType,
	title: PropTypes.node,
	desc: PropTypes.node,
	className: PropTypes.string,
};

export default InfoItem;
