const f = require('./utils/functions');
const fs = require('fs');
const ora = require('ora');

const startingProcess = ora(`Starting the scraper`).start().succeed();
let scraperProcess = ora(`Loading`).start();

if (!fs.existsSync(f.pathJSON)) {
	f.scrapeLinks(f.URL);

	setInterval(() => {
		scraperProcess.color = 'yellow';
		scraperProcess.text = `${f.recipeCollection.length}`;
	}, 1000);
}

module.exports = scraperProcess;
