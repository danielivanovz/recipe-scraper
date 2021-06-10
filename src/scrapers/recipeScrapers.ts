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

			const ratio: number = (377 - pageNumber) / (recipesCollection.length / 15);
			log.info(`Page: ${377 - pageNumber} Recipes: ${recipesCollection.length} Ratio: ${ratio.toPrecision(1)}`);

			scrapePage(pageNumber - 1);
		} else if (pageNumber === 0) writeJSON(recipesCollection);

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
