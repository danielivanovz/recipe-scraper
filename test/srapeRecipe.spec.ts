import 'jest-extended';
import { scrapeRecipe } from '../src/scrapers';

const testURL = 'https://ricette.giallozafferano.it/Tiramisu.html';

describe('scrapeRecipe', () => {
	it('should exist', () => {
		expect(scrapeRecipe).toBeDefined;
	});
	it('should return a recipe formatted as Recipe Model', async () => {
		const recipe = await scrapeRecipe(testURL);
		expect(recipe).toHaveProperty('title');
		expect(recipe).toHaveProperty('image');
		expect(recipe).toHaveProperty('description');
		expect(recipe).toHaveProperty('ingredients');
		expect(recipe).toHaveProperty('instructions');
		expect(recipe).toHaveProperty('calories');
		expect(recipe).toHaveProperty('category');
		expect(recipe).toHaveProperty('difficulty');
		expect(recipe).toHaveProperty('time');
	});
});
