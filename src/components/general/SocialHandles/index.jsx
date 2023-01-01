import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import mapSocialIcons from '@utils/general/mapSocialIcons';
import { clsx } from 'clsx';

/**
 * Render the SocialHandles component.
 *
 * @return {Element} The SocialHandles component.
 */
const SocialHandles = ({ handles, className, ...props }) => (
	<div className={clsx('flex flex-wrap gap-2 items-center justify-center', className)} {...props}>
		{Object.entries(handles).map(([key, url]) => {
			const Icon = mapSocialIcons(key);
			return Icon && url ? (
				<Anchor
					key={key}
					href={url}
					newWindow
					external
					className="flex items-center justify-center w-10 h-10 leading-none text-gray-100 border border-transparent rounded-full hover:text-neutral-300 focus-visible:text-neutral-300 focus-visible:outline-none focus-visible:border-neutral-600 focus-visible:rounded-full"
				>
					<Icon className="!text-xl" />
					<span className="sr-only">{key}</span>
				</Anchor>
			) : null;
		})}
	</div>
);

/**
 * Default Props.
 */
SocialHandles.defaultProps = {
	handles: {},
	className: '',
};

/**
 * Prop Types.
 */
SocialHandles.propTypes = {
	handles: PropTypes.shape({
		twitter: PropTypes.string,
		instagram: PropTypes.string,
		facebook: PropTypes.string,
		linkedin: PropTypes.string,
	}),
	className: PropTypes.string,
};

export default SocialHandles;
