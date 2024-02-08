import { isString } from 'lodash-es';
import { AxiosError } from 'axios';

const parseErrMsg = (error, defaultMsg = 'Something went wrong') => {
	if (!(error instanceof AxiosError)) return defaultMsg;

	if (error?.response?.data?.error) {
		const errMsg = error?.response?.data?.error;
		return isString(errMsg) ? errMsg : defaultMsg;
	}

	return defaultMsg;
};

export default parseErrMsg;
