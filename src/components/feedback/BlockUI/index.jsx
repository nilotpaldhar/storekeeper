import PropTypes from 'prop-types';
import LoadingBars from '@ui/Loaders/LoadingBars';
import { clsx } from 'clsx';

/**
 * Render the BlockUI component.
 *
 * @return {Element} The BlockUI component.
 */
const BlockUI = ({ blocking, children }) => (
	<div className="relative" aria-busy={blocking}>
		{children}
		<div
			className={clsx(
				'absolute inset-0 h-full overflow-hidden focus:outline-none z-[1010] transition-all duration-150',
				!blocking && 'invisible pointer-events-none opacity-0'
			)}
		>
			<div className="w-full h-full opacity-90 bg-white" />
			<div className="absolute top-2/4 left-0 right-0 transform -translate-y-2/4 z-[10001]">
				<span className="sr-only">Loading...</span>
				<div aria-hidden className="flex justify-center items-center z-[1011]">
					<LoadingBars />
				</div>
			</div>
		</div>
	</div>
);

/**
 * Default Props.
 */
BlockUI.defaultProps = {
	blocking: false,
	children: '',
};

/**
 * Prop Types.
 */
BlockUI.propTypes = {
	blocking: PropTypes.bool,
	children: PropTypes.node,
};

export default BlockUI;
