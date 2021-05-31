const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const subURL = 'https://www.giallozafferano.it';
const pathJSON = './output/recipes.json';
const URL = `${subURL}/ricette-cat/`;

const recipeCollection = [];
let isScraped = false;

/**
 * Returns response that will be check for status 200
 *
 * @param {String} URL The url to fetch from
 * @return {Object} response is an axios response
 */
const getStatus = async (URL) => {
	try {
		const response = await axios.get(URL);
		return response;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Check if we successfully connected to the @param URL and returns @param $ cheerio.
 *
 * @param {String} URL The url to fetch from
 * @return {$} $ cheerio object
 */
const getDOMModel = async (URL) => {
	try {
		let response = await getStatus(URL);
		if (response.status === 200) return cheerio.load(response.data);
	} catch (error) {
		console.error(error);
	}
};

/**
 * Fetch the DOM from @param URL and returns @param links.
 *
 * @param {String} URL The url to fetch from
 * @return {Object} links that contains all the recipe links from a single page
 */
const getLink = async (URL) => {
	const $ = await getDOMModel(URL);

	return new Promise(async (resolve, reject) => {
		let linkRAW = $('.gz-wrap-recipe-top > h2').toArray();
		let links = linkRAW.map((item) => {
			let link = $(item).find('a').attr('href');
			return link;
		});
		resolve({ links });
	});
};

/**
 * Fetch the last page of the pagination - this function will be changed.
 *
 * @param {String} URL The url to fetch from
 * @return {Number} pageNumber that indicates last page
 */
const getLastPage = async (URL) => {
	const $ = await getDOMModel(URL);
	return $('span.disabled.total-pages').text();
};

/**
 * Recursive fetch of paginated content and then it calls @param writeJSON()
 * and sets as TRUE the booo isScraped which handles the intervall in index.js
 *
 * @param {String} URL The url to fetch from
 * @param {Number} pageNumber that indicates last page
 */
const scrapePage = async (URL, pageNumber) => {
	return new Promise(async (resolve, reject) => {
		if (parseInt(pageNumber) !== 0) {
			let link = await getLink(`${URL}page${pageNumber}`);

			link['links'].forEach((e) => {
				scrapeRecipe(e).then((res) => {
					recipeCollection.push(res);
				});
			});

			pageNumber--;
			return scrapePage(URL, pageNumber);
		} else {
			writeJSON();
			isScraped = true;
		}
		resolve(recipeCollection);
	});
};

/**
 * Handles and Serves the recursive fetch in @param scrapePage()
 *
 * @param {String} URL The url to fetch from
 */
const scrapeLinks = async (URL) => {
	let pageNumber = await getLastPage(URL);
	scrapePage(URL, pageNumber);
};

/**
 * Scrapes the recipe and returns an object
 *
 * @param {String} URL The url to fetch from
 * @returns {Object} recipe Contains the scraped recipe
 */
const scrapeRecipe = async (url) => {
	return new Promise(async (resolve, reject) => {
		const $ = await getDOMModel(url);

		let title = $('div.gz-title-content.gz-innerdesktop > h1').text().toLowerCase();

		let image =
			$('.gz-featured-image > img').attr('data-src') ||
			$('div.gz-topstrip-recipe > div:nth-child(1) > div > picture > img').attr('src');

		let ingredientsRAW = $('.gz-list-ingredients > dd').toArray();
		let ingredients = ingredientsRAW.map((item) => {
			let temp = $(item).text().replace(/\s/g, '').slice(0, -4);
			let quantity = $(item).text().replace(/\s/g, '').replace(temp, '');

			let ingredient = $(item).find('a').text().toLowerCase();
			return { ingredient, quantity };
		});

		let descriptionRAW = $('.gz-content-recipe-step').toArray();
		let description = descriptionRAW.map((item, index) => {
			let step = $(item).parent();
			step = $('p', $(item)).text();

			return { step: index, instructions: step };
		});

		let calories = parseInt($('.gz-text-calories-total').text().replace(/\s/g, '').slice(0, -3));
		let category = $('.gz-breadcrumb > ul > li:nth-child(1) > a').text().toLowerCase();
		let difficulty = $('ul > li:nth-child(1) > span.gz-name-featured-data > strong').text().toLowerCase();
		let time = parseInt($('ul > li:nth-child(2) > span.gz-name-featured-data > strong').text());

		resolve({ title, image, ingredients, description, calories, category, difficulty, time });
	});
};

/**
 * Exports the @param recipeCollection to recipes.json
 *
 * @returns {JSON} recipe.json and logs the quantity of recipes scraped
 */
const writeJSON = async () => {
	try {
		fs.writeFileSync(pathJSON, JSON.stringify(recipeCollection, null, 4));
		console.log(`JSON data is saved and we successfully scraped: ${recipeCollection.length} recipes`);
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	scrapeLinks: scrapeLinks,
	recipeCollection: recipeCollection,
	isScraped: isScraped,
	pathJSON: pathJSON,
	URL: URL,
};
