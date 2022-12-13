import PropTypes from 'prop-types';
import Link from '@ui/general/Link';
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
			return Icon ? (
				<Link
					key={key}
					href={url}
					newWindow
					external
					className="w-10 h-10 flex justify-center items-center rounded-full border border-transparent text-gray-100 hover:text-neutral-300 leading-none focus:outline-none focus:border-neutral-600"
				>
					<Icon className="!text-xl" />
					<span className="sr-only">{key}</span>
				</Link>
			) : null;
		})}
	</div>
);

/**
 * Default Props.
 */
SocialHandles.defaultProps = {
	handles: {
		twitter: '#',
		instagram: '#',
		facebook: '#',
		linkedin: '#',
	},
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
