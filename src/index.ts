import { scrapePage, mainURL, getLastPage } from './scrapers';
import { Client } from './utils';

const connect = new Client();

const main = async () => {
	const $ = connect.getDOMModel(await connect.returnResponse(mainURL));
	await scrapePage(getLastPage(await $));
};
