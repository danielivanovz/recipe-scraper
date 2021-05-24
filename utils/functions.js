const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const subURL = 'https://www.giallozafferano.it';
const pathJSON = './output/recipes.json';
const URL = `${subURL}/ricette-cat/`;

const recipeCollection = [];
let isScraped = false;

const getStatus = async (URL) => {
	try {
		const response = await axios.get(URL);
		return response;
	} catch (error) {
		console.error(error);
	}
};

const getDOMModel = async (URL) => {
	try {
		let response = await getStatus(URL);
		if (response.status === 200) return cheerio.load(response.data);
	} catch (error) {
		console.error(error);
	}
};

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

const getLastPage = async (URL) => {
	const $ = await getDOMModel(URL);
	return $('span.disabled.total-pages').text();
};

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

const scrapeLinks = async (URL) => {
	let pageNumber = await getLastPage(URL);
	const $ = await getDOMModel(URL);
	scrapePage(URL, pageNumber);
};

const scrapeRecipe = async (url) => {
	return new Promise(async (resolve, reject) => {
		const $ = await getDOMModel(url);

		let title = $('div.gz-title-content.gz-innerdesktop > h1').text();

		let image =
			$('.gz-featured-image > img').attr('data-src') || $('div.gz-topstrip-recipe > div:nth-child(1) > div > picture > img').attr('src');

		let ingredientsRAW = $('.gz-list-ingredients > dd').toArray();
		let ingredients = ingredientsRAW.map((item) => {
			let temp = $(item).text().replace(/\s/g, '').slice(0, -4);
			let quantity = $(item).text().replace(/\s/g, '').replace(temp, '');

			let ingredient = $(item).find('a').text();
			return { ingredient, quantity };
		});

		let descriptionRAW = $('.gz-content-recipe-step').toArray();
		let description = descriptionRAW.map((item, index) => {
			let step = $(item).parent();
			step = $('p', $(item)).text();

			return { step: index, instructions: step };
		});

		let calories = $('.gz-text-calories-total').text().replace(/\s/g, '').slice(0, -3);
		let category = $('.gz-breadcrumb > ul > li:nth-child(1) > a').text();
		let difficulty = $('ul > li:nth-child(1) > span.gz-name-featured-data > strong').text();
		let time = parseInt($('ul > li:nth-child(2) > span.gz-name-featured-data > strong').text());

		resolve({ recipe: { title, image, ingredients, description, calories, category, difficulty, time } });
	});
};

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
