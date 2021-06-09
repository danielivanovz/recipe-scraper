import axios, { AxiosResponse } from 'axios';
import cheerio, { Cheerio, CheerioAPI } from 'cheerio';
import log from './logger';

export const mainURL = 'https://www.giallozafferano.it';
export const subURL = '/ricette-cat/';

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
		.map((item) => {
			return $(item).find('a').attr('href');
		});
};

export const getLastPage = ($: CheerioAPI): Number => {
	return Number($('span.disabled.total-pages').text());
};

const main = async (URL: string) => {
	const response = new getResponse();
	const $ = getDOMModel(await response.returnResponse(URL));
};

export const scrapeRecipe = async ($: CheerioAPI): Promise<Object> => {
	return Object;
};

main(`${mainURL}${subURL}`);
