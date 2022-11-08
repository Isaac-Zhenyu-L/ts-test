import { httpGet } from './mock-http-interface';

type SuccessfulRequest = {
	'Arnie Quote': string;
};
type FailedRequest = {
	FAILURE: string;
};
type TResult = SuccessfulRequest | FailedRequest;

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
	const _urls = urls.slice();
	const results = await Promise.all(
		_urls.map(async (url) => await getResult(url))
	);
	return results;
};

const getResult = async (url: string): Promise<TResult> => {
	const { status, body } = await httpGet(url);
	const _httpResponseBody = JSON.parse(body);
	const _sucessfulRequest: SuccessfulRequest = { 'Arnie Quote': '' };
	const _failedRequest: FailedRequest = { FAILURE: '' };
	if (status === 200) {
		_sucessfulRequest['Arnie Quote'] = _httpResponseBody.message;
		return _sucessfulRequest;
	} else {
		_failedRequest.FAILURE = _httpResponseBody.message;
		return _failedRequest;
	}
};
