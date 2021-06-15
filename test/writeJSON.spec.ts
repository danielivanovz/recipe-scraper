import { scrapeRecipe } from '../src/scrapers';
import { writeJSON } from '../src/utils';
import fs from 'fs';

const testURL = 'https://ricette.giallozafferano.it/Tiramisu.html';

describe('should save the recipes as JSON', () => {
	const testPATH = './test/test.json';

	it('should exist', () => {
		expect(writeJSON).toBeDefined;
	});
	it('should save correctly a JSON', async () => {
		const recipe = await scrapeRecipe(testURL);
		expect(await writeJSON(recipe, testPATH)).toHaveBeenCalled;
		expect(fs.existsSync(testPATH)).toBeTruthy;
	});
});
