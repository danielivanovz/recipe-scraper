import log from '../logger';
import { Recipe, subPageURL } from '.';
import { getResponse, writeJSON } from '../utils';
import { getLinksFromPage } from './pageScrapers';

const recipesCollection: Object[] = [];

export const scrapePage = async (pageNumber: any) => {
	return new Promise(async (resolve, reject) => {
		if (pageNumber !== 0) {
			const connect = new getResponse();
			const $ = await connect.getDOMModel(await connect.returnResponse(`${subPageURL}${pageNumber}`));

			Object.entries(getLinksFromPage($)).forEach(async ([key, URL]) => {
				const recipe = await scrapeRecipe(URL);
				recipesCollection.push(recipe);
			});

			scrapePage((await pageNumber) - 1);
			log.info(`Page: ${pageNumber} Recipes: ${recipesCollection.length}`);
		} else if (pageNumber === 0) await writeJSON(recipesCollection);

		resolve(recipesCollection);
		reject('I promised, and failed');
	});
};

export const scrapeRecipe = async (URL: string): Promise<Object> => {
	const recipe = new Recipe();
	const connect = new getResponse();
	const $ = connect.getDOMModel(await connect.returnResponse(URL));
	recipe.createRecipe(await $);
	return recipe;
};
