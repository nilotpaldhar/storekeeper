import seeder from '@libs/seeder';

const handler = async (req, res) => {
	if (process.env.NODE_ENV === 'production') {
		return res.status(404).end();
	}

	switch (req.query?.task) {
		case 'generate-mock-data': {
			try {
				await seeder();
				return res.send('Generated test data');
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.send('Failed to generate test data');
			}
		}

		default:
			return res.send('No task matched');
	}
};

export default handler;
