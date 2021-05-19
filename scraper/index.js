//const Models = require('./Model');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const Recipes = require('../utils/Model');
const recipe = new Recipes();

const url = 'https://www.giallozafferano.it/ricette-cat/page1/';
const subUrl = 'https://www.giallozafferano.it/ricette-cat/';
const pathJSON = './test/recipes.json';

let pageIncrementor = 1;
let scraped = false;

/**
 * @returns {html} - axios GET response
 */
const checkStatusUtils = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * @param {url}
 * @returns {object} $ - a cheerio object representing a DOM
 */
const getDOMModel = async (url) => {
  try {
    const response = await axios.get(url);
    const html = await response.data;
    return cheerio.load(html);
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * @return {recipe}
 */
const getLink = async ($, recipe) => {
  try {
    let cardsTemporary = await $('.gz-wrap-recipe-top > h2').each(
      (i, value) => {
        recipe.newRecipe(
          $(value).find('a').attr('href'),
          $(value).find('a').attr('title')
        );
      }
    );
    return recipe.link;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const scrapeRecipe = async (url) => {
  try {
    const status = await checkStatusUtils(url);
    // if (pageIncrementor < 3) { // Test Purpos, scrap only two pages
    if (status.includes('Pagina successiva')) {
      await getDOMModel(url).then(($) => {
        setTimeout(() => {
          getLink($, recipe);
        }, 0);
      });
      return scrapeRecipe(`${subUrl}page${(pageIncrementor += 1)}/`);
    }
    return recipe;
  } catch (error) {
    console.error(error);
  }
};

const writeJSON = async (recipe) => {
  try {
    fs.writeFileSync('./test/recipes.json', JSON.stringify(recipe, null, 4));
    console.log('JSON data is saved');
  } catch (error) {
    console.error(error);
  }
};

if (!fs.existsSync(pathJSON)) {
  scrapeRecipe(url).then(() => {
    writeJSON(recipe);
    scraped = true;
  });

  const loader = setInterval(() => {
    console.log(recipe.numberOfRecipes);
    if (scraped) {
      clearInterval(loader);
    }
  }, 1000);
}
