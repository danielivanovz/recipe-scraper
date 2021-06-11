import { getLastPage } from '../src/scrapers/pageScrapers';
import { scrapePage } from './scrapers/recipeScrapers';
import { getResponse } from './utils/index';
import { pathJSON } from './utils/index';
import fs from 'fs';

export const mainURL = 'https://www.giallozafferano.it/ricette-cat/';

const connect = new getResponse();
const main = async () => {
	const $ = connect.getDOMModel(await connect.returnResponse(mainURL));
	return $;
};
if (connect.isConnected(mainURL) && !fs.existsSync(pathJSON)) {
	main().then(($) => scrapePage(getLastPage($)));
}
