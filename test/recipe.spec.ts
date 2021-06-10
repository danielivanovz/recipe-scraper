import 'jest-extended';
import { Recipe } from '../src/scrapers';
import { getResponse } from '../src/utils';

const testURL = 'https://ricette.giallozafferano.it/Tiramisu.html';

describe('Recipe Class', () => {
	const connect = new getResponse();
	const recipe = new Recipe();

	beforeAll(async () => {
		const $ = await connect.getDOMModel(await connect.returnResponse(testURL));
		recipe.createRecipe($);
	});

	it('should exist', () => {
		expect(Recipe).toBeDefined;
	});
	it('should define the right values', async () => {
		expect(recipe.title).toBeString;
		expect(recipe.image).toBeString;
		expect(recipe.description).toBeString;
		expect(recipe.ingredients).toBeArray;
		expect(recipe.instructions).toBeArray;
		expect(recipe.calories).toBeNumber;
		expect(recipe.category).toBeString;
		expect(recipe.difficulty).toBeString;
		expect(recipe.time).toBeNumber;
	});
	it('method should return a recipe object', async () => {
		expect(recipe).toBeObject;
		expect(recipe.title).toBe('tiramisù');
		expect(recipe.image).toBe('https://www.giallozafferano.it/images/173-17354/Tiramisu_450x300.jpg');
		expect(recipe.description).toBe(
			'Il tiramisù è sicuramente uno dei dessert più golosi e conosciuti al mondo, grazie alla dolcezza del mascarpone e al gusto intenso del caffè.'
		);
	});
});
