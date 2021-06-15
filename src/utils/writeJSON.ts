import fs from 'fs';
import log from '../logger/index';

export const writeJSON = async (collection: Array<object> | any, path: string) => {
	try {
		fs.writeFileSync(path, JSON.stringify(collection, null, 4));
		log.info(`JSON data is saved and we successfully scraped: ${collection.length} recipes`);
	} catch (error) {}
};
