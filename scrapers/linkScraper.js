const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const Links = require('../utils/Model');
const linksCollection = new Links();

const url = 'https://www.giallozafferano.it/ricette-cat/page1/';
const subUrl = 'https://www.giallozafferano.it/ricette-cat/';
const pathJSON = './output/links.json';

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
 * @return {link}
 */
const createLinksCollection = async ($, linksCollection) => {
  try {
    let cardsTemporary = await $('.gz-wrap-recipe-top > h2').each(
      (i, value) => {
        linksCollection.createLink(
          $(value).find('a').attr('href'),
          $(value).find('a').attr('title')
        );
      }
    );
    return linksCollection.link;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const scrapeLink = async (url) => {
  try {
    const status = await checkStatusUtils(url);
    if (status.includes('Pagina successiva')) {
      await getDOMModel(url).then(($) => {
        setTimeout(() => {
          createLinksCollection($, linksCollection);
        }, 0);
      });
      return scrapeLink(`${subUrl}page${(pageIncrementor += 1)}/`);
    }
    return linksCollection;
  } catch (error) {
    console.error(error);
  }
};

const writeJSON = async (linksCollection) => {
  try {
    fs.writeFileSync(pathJSON, JSON.stringify(linksCollection, null, 4));
    console.log(
      `JSON data is saved and we successfully scraped: ${linksCollection.numberOfLinks} recipes`
    );
  } catch (error) {
    console.error(error);
  }
};

if (!fs.existsSync(pathJSON)) {
  scrapeLink(url).then(() => {
    writeJSON(linksCollection);
    scraped = true;
  });

  const loader = setInterval(() => {
    console.log(linksCollection.numberOfLinks);
    if (scraped) {
      clearInterval(loader);
    }
  }, 1000);
}
