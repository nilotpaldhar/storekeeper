/** Validates request method. */
const validateReqMethod = (req, res, supportedMethods = [], callback = () => {}) => {
	const reqMethod = req?.method;
	if (!supportedMethods.includes(reqMethod)) {
		return res.status(405).json({
			method: reqMethod,
			error: 'The request method is not supported',
		});
	}
	return callback(reqMethod);
};

export default validateReqMethod;
