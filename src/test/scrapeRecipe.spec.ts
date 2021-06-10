import 'jest-extended';
import { getDOMModel, getResponse, mainURL, scrapeRecipe } from '..';

describe('scrapeRecipe', () => {
	const response = new getResponse();

	it('should exists', () => {
		expect(scrapeRecipe).toBeDefined;
	});
	it('should return an interface Recipe', async () => {
		const $ = getDOMModel(await response.returnResponse(mainURL));
		expect(scrapeRecipe($)).toBeObject;
	});
});
