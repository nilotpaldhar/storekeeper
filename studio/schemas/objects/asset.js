export default {
	title: 'Asset',
	name: 'asset',
	type: 'object',
	fields: [
		{
			title: 'ID',
			name: 'id',
			type: 'string',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text',
		},
		{
			title: 'Is Image',
			name: 'isImage',
			type: 'boolean',
			initialValue: false,
		},
		{
			title: 'Filename',
			name: 'filename',
			type: 'string',
		},
		{
			title: 'File Extension',
			name: 'fileExtension',
			type: 'string',
		},
		{
			title: 'File Size',
			name: 'fileSize',
			type: 'number',
		},
		{
			title: 'Width',
			name: 'width',
			type: 'number',
		},
		{
			title: 'Height',
			name: 'height',
			type: 'number',
		},
	],
};
