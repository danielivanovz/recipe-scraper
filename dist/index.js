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
exports.scrapeRecipe = exports.getLastPage = exports.getLinksFromPage = exports.getDOMModel = exports.getResponse = exports.subURL = exports.mainURL = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
exports.mainURL = 'https://www.giallozafferano.it';
exports.subURL = '/ricette-cat/';
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
        .map((item) => {
        return $(item).find('a').attr('href');
    });
};
exports.getLinksFromPage = getLinksFromPage;
const getLastPage = ($) => {
    return Number($('span.disabled.total-pages').text());
};
exports.getLastPage = getLastPage;
const main = (URL) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new getResponse();
    const $ = exports.getDOMModel(yield response.returnResponse(URL));
});
const scrapeRecipe = ($) => __awaiter(void 0, void 0, void 0, function* () {
    return Object;
});
exports.scrapeRecipe = scrapeRecipe;
main(`${exports.mainURL}${exports.subURL}`);
