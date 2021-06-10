"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeRecipe = exports.getLastPage = exports.getLinksFromPage = exports.getDOMModel = exports.getResponse = exports.testURL = exports.subURL = exports.mainURL = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const Recipe_1 = require("./Recipe");
exports.mainURL = 'https://www.giallozafferano.it';
exports.subURL = '/ricette-cat/';
exports.testURL = 'https://ricette.giallozafferano.it/Piadina-con-crema-al-mascarpone-fragole-e-cioccolato-fondente.html';
class getResponse {
    isConnected(URL) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios_1.default.get(URL)).status;
        });
    }
    returnResponse(URL) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(URL);
        });
    }
}
exports.getResponse = getResponse;
const getDOMModel = (response) => {
    return cheerio_1.default.load(response.data);
};
exports.getDOMModel = getDOMModel;
const getLinksFromPage = ($) => {
    return $('div.gz-wrap-recipe-top > h2')
        .toArray()
        .map((e) => {
        return $(e).find('a').attr('href');
    });
};
exports.getLinksFromPage = getLinksFromPage;
const getLastPage = ($) => {
    return Number($('span.disabled.total-pages').text());
};
exports.getLastPage = getLastPage;
const scrapeRecipe = ($) => __awaiter(void 0, void 0, void 0, function* () {
    // return title = $('div.gz-title-content.gz-innerdesktop > h1').text().toLowerCase();
    return Object;
});
exports.scrapeRecipe = scrapeRecipe;
const main = (URL) => __awaiter(void 0, void 0, void 0, function* () {
    const connect = new getResponse();
    const $ = exports.getDOMModel(yield connect.returnResponse(URL));
    const recipe = new Recipe_1.Recipe();
    recipe.createRecipe($);
    console.log(recipe);
});
// main(`${mainURL}${subURL}`);
main(exports.testURL);
