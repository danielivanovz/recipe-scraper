import 'jest-extended';
import { getLinksFromPage } from '../src/scrapers';
import { getResponse } from '../src/utils';
import { mainURL } from '../src/index';

describe('getLinksFromPage', () => {
	const response = new getResponse();
	it('should exist', () => {
		expect(getLinksFromPage).toBeDefined;
	});
	it('should return an array of links', async () => {
		const $ = await response.getDOMModel(await response.returnResponse(mainURL));
		expect(getLinksFromPage($)).toBeArray;
	});
	it('should be max 15 values', async () => {
		const $ = await response.getDOMModel(await response.returnResponse(mainURL));
		const result: any = getLinksFromPage($);
		expect(result.length).toBe(15);
	});
});
