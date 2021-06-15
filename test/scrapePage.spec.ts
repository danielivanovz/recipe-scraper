import 'jest-extended';
import { scrapePage } from '../src/scrapers';

describe('scrapePage', () => {
	it('should exist', () => {
		expect(scrapePage).toBeDefined;
	});
	it('should return a recipe', () => {
		expect(scrapePage(2)).resolves.toBeArray();
	});
});
