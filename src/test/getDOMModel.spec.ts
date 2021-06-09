import { getResponse, mainURL, getDOMModel } from '../index';

describe('getDOMModel', () => {
	const response = new getResponse();

	it('should exists', () => {
		expect(getDOMModel).toBeDefined();
	});
	it('should return a cheerio object', async () => {
		expect(getDOMModel(await response.returnResponse(mainURL))).not.toBeNull;
	});
});
