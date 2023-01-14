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
const AuthLayout = ({ site, children, ...props }) => {
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
			<div className="flex-1 flex flex-col min-h-full">
				<header className="w-full h-20 border-b border-neutral-100">
					<Container className="h-full xl:px-16 flex flex-wrap items-center justify-between">
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
				<Container className="flex-1 h-full">{children}</Container>
			</div>
			<div className={imgWrapperClassNames} />
			<div className={`${imgWrapperClassNames} fixed inset-y-0 right-0 bg-[#fafafa]`}>
				<div className="h-full w-full flex items-center">
					<Image src={authGraphicSrc} alt="Auth Graphics" />
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
};

export default AuthLayout;
