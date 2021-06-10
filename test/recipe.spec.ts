import 'jest-extended';
import { Recipe } from '../src/scrapers';
import { getResponse } from '../src/utils';

const testURL = 'https://ricette.giallozafferano.it/Tiramisu.html';

describe('Recipe Class', () => {
	const connect = new getResponse();
	const recipe = new Recipe();

	it('should exist', () => {
		expect(Recipe).toBeDefined;
	});
	it('should define the right values', async () => {
		expect(recipe.title).toBeString;
		expect(recipe.image).toBeString;
		expect(recipe.description).toBeString;
		expect(recipe.ingredients).toBeString;
		expect(recipe.instructions).toBeString;
		expect(recipe.calories).toBeNumber;
		expect(recipe.category).toBeString;
		expect(recipe.difficulty).toBeString;
		expect(recipe.time).toBeNumber;
	});
	it('method should return a recipe object', async () => {
		const $ = await connect.getDOMModel(await connect.returnResponse(testURL));
		const testRecipe = recipe.createRecipe($);
		expect(testRecipe).toBeObject;
	});
});
