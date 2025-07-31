"use client";

import {
	type AutocompleteClassNames,
	type AutocompletePlugin,
	autocomplete,
} from "@algolia/autocomplete-js";
import { createElement, Fragment, useEffect, useRef } from "react";
import { type Root, createRoot } from "react-dom/client";

import { AutoCompleteItem } from "@/components/search/autocomplete/item";
import { AutoCompleteItemAction } from "@/components/search/autocomplete/item-action";

import { cn } from "@/lib/utils/general/cn";

type AutoCompleteProps = {
	initialQuery?: string;
	classNames?: Partial<AutocompleteClassNames> & { container?: string };
	placeholder?: string;
	detachedMediaQuery?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plugins?: AutocompletePlugin<any, any>[];
	onSubmit?: (params: { query: string }) => void;
	onNavigate?: (params: { itemUrl: string }) => void;
};

const AutoComplete = ({
	initialQuery,
	classNames,
	placeholder,
	detachedMediaQuery,
	plugins,
	onSubmit,
	onNavigate,
}: AutoCompleteProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const panelRootRef = useRef<Root | null>(null);
	const rootRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const search = autocomplete({
			container: containerRef.current,
			renderer: { createElement, Fragment, render: () => {} },
			render({ children }, root) {
				if (!panelRootRef.current || rootRef.current !== root) {
					rootRef.current = root;

					// unmount previous root if it exists
					panelRootRef.current?.unmount();

					// create a new root
					panelRootRef.current = createRoot(root);
				}

				// render new children
				panelRootRef.current.render(children);
			},
			initialState: {
				query: initialQuery,
			},
			classNames,
			placeholder,
			detachedMediaQuery,
			openOnFocus: true,
			plugins,
			onSubmit: ({ state }) => onSubmit?.({ query: state.query }),
			navigator: { navigate: ({ itemUrl }) => onNavigate?.({ itemUrl }) },
		});

		return () => {
			search.destroy();
		};
	}, [classNames, detachedMediaQuery, initialQuery, placeholder, plugins, onNavigate, onSubmit]);

	return <div ref={containerRef} className={cn("", classNames?.container)} />;
};

export { AutoComplete, AutoCompleteItem, AutoCompleteItemAction };
