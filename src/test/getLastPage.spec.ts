import { getDOMModel, getLastPage, getResponse, mainURL } from '../index';
import 'jest-extended';

describe('getLastPage', () => {
	const response = new getResponse();

	it('should exist', () => {
		expect(getLastPage).toBeDefined;
	});
	it('should return a number', async () => {
		const $ = getDOMModel(await response.returnResponse(mainURL));
		expect(getLastPage($)).toBeNumber();
	});
});
