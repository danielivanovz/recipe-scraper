import { mainURL } from '../src';
import { getResponse } from '../src/utils';

describe('getDOMModel', () => {
	const connect = new getResponse();

	it('should exists', () => {
		expect(connect.getDOMModel).toBeDefined();
	});
	it('should return a cheerio object', async () => {
		expect(connect.getDOMModel(await connect.returnResponse(mainURL))).not.toBeNull;
	});
});
