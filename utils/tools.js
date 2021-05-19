const axios = require('axios');
const cheerio = require('cheerio');
const Recipes = require('./Model');
const fs = require('fs');

const url = 'https://www.giallozafferano.it/ricette-cat/page1/';
const subUrl = 'https://www.giallozafferano.it/ricette-cat/';
const pathJSON = './recipes.json';

let pageIncrementor = 1;
let scraped = false;

const recipe = new Recipes();

module.exports = {
  axios: axios,
  cheerio: cheerio,
  Recipes: Recipes,
  fs: fs,
  url: url,
  subUrl: subUrl,
  pathJSON: pathJSON,
  pageIncrementor: pageIncrementor,
  scraped: scraped,
  recipe: recipe,
};
