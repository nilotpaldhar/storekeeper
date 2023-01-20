import PropTypes from 'prop-types';

/** Components. */
import Logo from '@ui/data-display/Logo';
import Image from '@ui/data-display/Image';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';

/** Icons. */
import ArrowLeftIcon from '@icons/regular/ArrowLeft';

/** Static Images. */
import authGraphicSrc from '@public/graphics/auth.svg';

/**
 * Render the AuthLayout component.
 *
 * @return {Element} The AuthLayout component.
 */
const AuthLayout = ({ site, children, graphics, ...props }) => {
	const imgWrapperClassNames = 'hidden xl:block min-w-[625px]';

	/** Logo Config. */
	const logoConf = {
		href: '/',
		srcSanity: true,
		src: site?.logo,
		alt: site?.title,
		className: 'shrink-0',
	};

	return (
		<div className="relative flex h-full" {...props}>
			<div className="flex flex-col flex-1 min-h-full">
				<header className="w-full h-20 border-b shrink-0 border-neutral-100">
					<Container className="flex flex-wrap items-center justify-between h-full xl:px-16">
						<Logo {...logoConf} />
						<nav>
							<RegularButton
								href="/"
								as="anchor"
								intent="dark-ghost"
								startIcon={ArrowLeftIcon}
								className="!font-semibold"
							>
								Back to home
							</RegularButton>
						</nav>
					</Container>
				</header>
				<div className="flex-1 h-full">{children}</div>
			</div>
			<div className={imgWrapperClassNames} />
			<div className={`${imgWrapperClassNames} fixed inset-y-0 right-0 bg-[#fafafa]`}>
				<div className="flex items-center w-full h-full">
					<Image src={graphics} alt="Graphics" />
				</div>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
AuthLayout.defaultProps = {
	site: {},
	children: '',
	graphics: authGraphicSrc,
};

/**
 * Prop Types.
 */
AuthLayout.propTypes = {
	site: PropTypes.shape({
		title: PropTypes.string,
		logo: PropTypes.string,
	}),
	children: PropTypes.node,
	graphics: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default AuthLayout;
