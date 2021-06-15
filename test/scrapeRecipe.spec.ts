import 'jest-extended';
import { scrapeRecipe } from '../src/scrapers';
import { Client } from '../src/utils';

const testURL = 'https://ricette.giallozafferano.it/Tiramisu.html';

describe('scrapeRecipe', () => {
	const connect = new Client();

	it('should exists', () => {
		expect(scrapeRecipe).toBeDefined;
	});
	it('should return an interface Recipe', async () => {
		const $ = connect.getDOMModel(await connect.returnResponse(testURL));

		expect(scrapeRecipe(testURL)).toBeObject;
	});
});
