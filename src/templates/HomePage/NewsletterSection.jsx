import PropTypes from 'prop-types';

import Container from '@ui/general/Container';
import NewsletterForm from '@ui/data-entry/NewsletterForm';
import PaperPlaneIcon from '@icons/regular/PaperPlane';

import clsx from 'clsx';

/**
 * Render the NewsletterSection component.
 *
 * @return {Element} The NewsletterSection component.
 */
const NewsletterSection = ({ title, subtitle, className, ...props }) => (
	<section className={clsx('pt-4 xl:pt-6', className)} {...props}>
		<div className="bg-primary-50 py-20 bg-gradient-to-b from-white to-[#F7FCFF]">
			<Container>
				<div className="md:max-w-lg lg:max-w-2xl mx-auto">
					<div className="flex justify-center text-primary-600 mb-6">
						<PaperPlaneIcon className="!text-5xl" />
					</div>
					<div className="flex flex-col space-y-4 max-w-md mx-auto text-neutral-900 mb-10 text-center">
						<h2 className="text-xl md:text-2xl text-current font-medium capitalize leading-tight tracking-widest">
							{title}
						</h2>
						<p className="text-current text-sm md:text-base font-normal leading-relaxed tex">
							{subtitle}
						</p>
					</div>
					<NewsletterForm
						className="bg-white shadow-newsletter-container p-1.5"
						classNames={{
							form: 'w-full flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center',
							input: `
										w-full sm:w-fit bg-transparent block flex-1 h-10 text-neutral-700 py-2 sm:px-4
										border border-transparent placeholder:font-light placeholder:text-neutral-500
										focus:outline-none focus-visible:outline-none
									`,
							submit: 'px-8 w-full sm:w-fit',
						}}
					/>
				</div>
			</Container>
		</div>
	</section>
);

/**
 * Default Props.
 */
NewsletterSection.defaultProps = {
	title: 'Join Our Newsletter?',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit',
	className: '',
};

/**
 * Prop Types.
 */
NewsletterSection.propTypes = {
	title: PropTypes.node,
	subtitle: PropTypes.node,
	className: PropTypes.string,
};

export default NewsletterSection;
