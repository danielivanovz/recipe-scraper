import { getLastPage } from '../src/scrapers/pageScrapers';
import { scrapePage } from './scrapers/recipeScrapers';
import { Client } from './utils';
import fs from 'fs';
import { pathJSON } from './scrapers';

export const mainURL = 'https://www.giallozafferano.it/ricette-cat/';

const connect = new Client();
const main = async () => {
	const $ = connect.getDOMModel(await connect.returnResponse(mainURL));
	return $;
};

// commented due to travis bugging out
//
// if (connect.isConnected(mainURL) && !fs.existsSync(pathJSON)) {
// 	main()
// 		.then(async ($) => await scrapePage(getLastPage($)))
// 		.finally(() => {
// 			return;
// 		});
// }
