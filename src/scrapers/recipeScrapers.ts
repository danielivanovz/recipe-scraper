import log from '../logger';
import { Recipe, subPageURL } from '.';
import { Client, writeJSON } from '../utils';
import { getLinksFromPage } from './pageScrapers';
import { pathJSON } from '.';

export const recipesCollection: Object[] = [];
export const mainURL = 'https://www.giallozafferano.it/ricette-cat/';

export const scrapePage = async (pageNumber: number) => {
	return new Promise(async (resolve, reject) => {
		if (pageNumber !== 0) {
			const connect = new Client();
			const $ = await connect.getDOMModel(await connect.returnResponse(`${subPageURL}${pageNumber}`));

			Object.entries(getLinksFromPage($)).forEach(async ([key, URL]) => {
				const recipe = await scrapeRecipe(URL);
				recipesCollection.push(recipe);
			});

			await scrapePage(pageNumber - 1);
			// log.info(`Page: ${pageNumber} Recipes: ${recipesCollection.length}`);
		} else writeJSON(recipesCollection, pathJSON);

		resolve(recipesCollection);
		reject('I promised, and failed');
	});
};

export const scrapeRecipe = async (URL: string): Promise<Object> => {
	const recipe = new Recipe();
	const connect = new Client();
	const $ = connect.getDOMModel(await connect.returnResponse(URL));
	recipe.createRecipe(await $);
	return recipe;
};
