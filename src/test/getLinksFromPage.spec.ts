import { getDOMModel, getLinksFromPage, getResponse, mainURL } from '../index';
import 'jest-extended';

describe('getLinksFromPage', () => {
	const response = new getResponse();
	it('should exist', () => {
		expect(getLinksFromPage).toBeDefined;
	});
	it('should return an array of links', async () => {
		const $ = getDOMModel(await response.returnResponse(mainURL));
		expect(getLinksFromPage($)).toBeArray;
	});
	it('should be max 15 values', async () => {
		const $ = getDOMModel(await response.returnResponse(mainURL));
		const result: any = getLinksFromPage($);

		expect(result.length).toBeLessThanOrEqual(15);
	});
});
