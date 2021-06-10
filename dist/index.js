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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainURL = void 0;
const scrapers_1 = require("./scrapers");
const utils_1 = require("./utils");
exports.mainURL = 'https://www.giallozafferano.it/ricette-cat/';
const main = (URL) => __awaiter(void 0, void 0, void 0, function* () {
    const connect = new utils_1.getResponse();
    if (connect.isConnected(URL)) {
        const $ = connect.getDOMModel(yield connect.returnResponse(URL));
        scrapers_1.scrapePage(scrapers_1.getLastPage(yield $));
    }
});
main(exports.mainURL);
