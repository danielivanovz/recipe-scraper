import 'jest-extended';
import { mainURL } from '../src';
import { scrapeRecipe } from '../src/scrapers';
import { getResponse } from '../src/utils';

const testURL = 'https://www.giallozafferano.it/ricette-cat/page2';

describe('scrapeRecipe', () => {
	const connect = new getResponse();

	it('should exists', () => {
		expect(scrapeRecipe).toBeDefined;
	});
	it('should return an interface Recipe', async () => {
		const $ = connect.getDOMModel(await connect.returnResponse(mainURL));

		expect(scrapeRecipe(testURL)).toBeObject;
	});
});
