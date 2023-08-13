import PropTypes from 'prop-types';
import { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import { autocomplete } from '@algolia/autocomplete-js';

/**
 * Render the AutoComplete component.
 *
 * @return {Element} The AutoComplete component.
 */
const AutoComplete = ({ className, ...props }) => {
	const containerRef = useRef(null);
	const panelRootRef = useRef(null);
	const rootRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) return undefined;

		const search = autocomplete({
			container: containerRef.current,
			renderer: { createElement, Fragment, render: () => {} },
			render({ children }, root) {
				if (!panelRootRef.current || rootRef.current !== root) {
					rootRef.current = root;
					panelRootRef.current?.unmount();
					panelRootRef.current = createRoot(root);
				}
				panelRootRef.current.render(children);
			},
			...props,
		});

		return () => {
			search.destroy();
		};
	}, [props]);

	return <div ref={containerRef} className={className} />;
};

/**
 * Default Props.
 */
AutoComplete.defaultProps = {
	className: '',
	classNames: {
		form: '',
		inputWrapperPrefix: '',
		inputWrapperSuffix: '',
		label: '',
		submitButton: '',
		clearButton: '',
		input: '',
		panel: '',
		detachedOverlay: '',
		detachedSearchButton: '',
		detachedSearchButtonPlaceholder: '',
		detachedSearchButtonIcon: '',
		detachedContainer: '',
		detachedFormContainer: '',
		detachedCancelButton: '',
	},
	placeholder: 'Search for products, brands and more',
	detachedMediaQuery: '(max-width: 992px)',
	initialState: { query: '' },
	openOnFocus: true,
	navigator: {
		navigate: () => {},
	},
	onSubmit: () => {},
	plugins: [],
};

/**
 * Prop Types.
 */
AutoComplete.propTypes = {
	className: PropTypes.string,
	classNames: PropTypes.shape({
		form: PropTypes.string,
		inputWrapperPrefix: PropTypes.string,
		inputWrapperSuffix: PropTypes.string,
		label: PropTypes.string,
		submitButton: PropTypes.string,
		clearButton: PropTypes.string,
		input: PropTypes.string,
		panel: PropTypes.string,
		detachedOverlay: PropTypes.string,
		detachedSearchButton: PropTypes.string,
		detachedSearchButtonPlaceholder: PropTypes.string,
		detachedSearchButtonIcon: PropTypes.string,
		detachedContainer: PropTypes.string,
		detachedFormContainer: PropTypes.string,
		detachedCancelButton: PropTypes.string,
	}),
	placeholder: PropTypes.string,
	detachedMediaQuery: PropTypes.string,
	initialState: PropTypes.shape({
		query: PropTypes.string,
	}),
	openOnFocus: PropTypes.bool,
	navigator: PropTypes.shape({
		navigate: PropTypes.func,
	}),
	onSubmit: PropTypes.func,
	plugins: PropTypes.arrayOf(PropTypes.shape({})),
};

export default AutoComplete;
