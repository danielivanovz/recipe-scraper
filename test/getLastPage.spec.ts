import 'jest-extended';
import { mainURL } from '../src';
import { getLastPage } from '../src/scrapers';
import { getResponse } from '../src/utils';

describe('getLastPage', () => {
	const response = new getResponse();

	it('should exist', () => {
		expect(getLastPage).toBeDefined;
	});
	it('should return a number', async () => {
		const $ = await response.getDOMModel(await response.returnResponse(mainURL));
		expect(getLastPage($)).toBeNumber();
	});
});
