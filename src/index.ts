import axios, { AxiosResponse } from 'axios';
import cheerio, { Cheerio, CheerioAPI } from 'cheerio';
import log from './logger';
import { Recipe } from './Recipe';

export const mainURL = 'https://www.giallozafferano.it';
export const subURL = '/ricette-cat/';
export const testURL =
	'https://ricette.giallozafferano.it/Piadina-con-crema-al-mascarpone-fragole-e-cioccolato-fondente.html';

export class getResponse {
	async isConnected(URL: string): Promise<number> {
		return (await axios.get(URL)).status;
	}
	async returnResponse(URL: string): Promise<AxiosResponse<any>> {
		return await axios.get(URL);
	}
}

export const getDOMModel = (response: AxiosResponse<any>): CheerioAPI => {
	return cheerio.load(response.data);
};

export const getLinksFromPage = ($: CheerioAPI): Object => {
	return $('div.gz-wrap-recipe-top > h2')
		.toArray()
		.map((e) => {
			return $(e).find('a').attr('href');
		});
};

export const getLastPage = ($: CheerioAPI): Number => {
	return Number($('span.disabled.total-pages').text());
};

export const scrapeRecipe = async ($: CheerioAPI): Promise<Object> => {
	// return title = $('div.gz-title-content.gz-innerdesktop > h1').text().toLowerCase();
	return Object;
};

const main = async (URL: string) => {
	const connect = new getResponse();
	const $ = getDOMModel(await connect.returnResponse(URL));
	const recipe = new Recipe();
	recipe.createRecipe($);
	console.log(recipe);
};

// main(`${mainURL}${subURL}`);
main(testURL);
