const f = require('./utils/functions');
const fs = require('fs');

if (!fs.existsSync(f.pathJSON)) {
	f.scrapeLinks(f.URL);

	const loader = setInterval(() => {
		console.log(f.recipeCollection.length);
		if (f.isScraped) {
			clearInterval(loader);
		}
	}, 1000);
}
