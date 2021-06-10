import { getLastPage } from '../src/scrapers/pageScrapers';
import { scrapePage } from './scrapers/recipeScrapers';
import { getResponse } from './utils';

export const mainURL = 'https://www.giallozafferano.it/ricette-cat/';

const main = async (URL: string) => {
	const connect = new getResponse();
	if (connect.isConnected(URL)) {
		const $ = connect.getDOMModel(await connect.returnResponse(URL));

		scrapePage(getLastPage(await $));
	}
};

main(mainURL);
