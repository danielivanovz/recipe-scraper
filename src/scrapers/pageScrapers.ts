import { CheerioAPI } from 'cheerio';

export const getLastPage = ($: CheerioAPI): Number => {
	return Number($('span.disabled.total-pages').text());
};

export const getLinksFromPage = ($: CheerioAPI): Object => {
	return $('div.gz-wrap-recipe-top > h2')
		.toArray()
		.map((e) => {
			return $(e).find('a').attr('href');
		});
};
