import fs from 'fs';
import log from '../logger/index';

export const pathJSON = './recipes.json';

export const writeJSON = async (collection: any) => {
	try {
		fs.writeFileSync(pathJSON, JSON.stringify(collection, null, 4));
		log.info(`JSON data is saved and we successfully scraped: ${collection.length} recipes`);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};
