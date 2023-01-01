import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import { PortableText } from '@portabletext/react';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the StaticPageTmpl component.
 *
 * @return {Element} The StaticPageTmpl component.
 */
const StaticPageTmpl = ({ data: { content } = {} }) => {
	const classNameMods = {
		root: 'prose-sm prose prose-neutral max-w-none',
		headings: 'prose-headings:mt-0 prose-headings:mb-2 prose-headings:leading-snug',
		h1: 'prose-h1:text-2xl',
		h2: 'prose-h2:text-xl',
		h3: 'prose-h3:text-lg',
		h4: 'prose-h4:text-base',
		paragraph: 'prose-p:leading-loose',
		anchor: 'prose-a:text-primary-600 prose-a:font-medium prose-a:no-underline',
	};

	return (
		<main className="py-10 lg:py-14">
			<Container>
				<div className={clsx(...Object.values(classNameMods))}>
					<PortableText value={content} />
				</div>
			</Container>
		</main>
	);
};

/**
 * Prop Types.
 */
StaticPageTmpl.propTypes = {
	data: PropTypes.shape({
		content: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
};

export default StaticPageTmpl;
