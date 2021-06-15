import 'jest-extended';
import { scrapePage, recipesCollection } from '../src/scrapers';

describe('scrapePage', () => {
	it('should exist', () => {
		expect(scrapePage).toBeDefined;
	});
	it('should return a recipe', async () => {
		expect(await scrapePage(3)).toBeArray;
		expect(recipesCollection.length).not.toBe(null);
	});
});
