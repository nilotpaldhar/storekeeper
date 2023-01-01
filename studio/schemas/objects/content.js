import Header1 from '../../components/block-renders/Header1';
import Header2 from '../../components/block-renders/Header2';
import Header3 from '../../components/block-renders/Header3';
import Header4 from '../../components/block-renders/Header4';

export default {
	title: 'Portable Content',
	name: 'portableContent',
	type: 'array',
	of: [
		{
			title: 'Block',
			type: 'block',
			styles: [
				{ title: 'Paragraph', value: 'normal' },
				{ title: 'H1', value: 'h1', blockEditor: { render: Header1 } },
				{ title: 'H2', value: 'h2', blockEditor: { render: Header2 } },
				{ title: 'H3', value: 'h3', blockEditor: { render: Header3 } },
				{ title: 'H4', value: 'h4', blockEditor: { render: Header4 } },
				{ title: 'Quote', value: 'blockquote' },
			],
			lists: [{ title: 'Bullet', value: 'bullet' }],
			marks: {
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
					{ title: 'Underline', value: 'underline' },
					{ title: 'Strike', value: 'strike-through' },
					{ title: 'Code', value: 'code' },
				],
			},
		},
	],
};
