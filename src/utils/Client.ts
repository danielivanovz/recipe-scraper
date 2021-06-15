import axios, { AxiosResponse } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

export class Client {
	isConnected = async (URL: string): Promise<number> => {
		return (await axios.get(URL)).status;
	};
	returnResponse = async (URL: string): Promise<AxiosResponse<any>> => {
		return await axios.get(URL);
	};
	getDOMModel = async (response: AxiosResponse<any>): Promise<CheerioAPI> => {
		return cheerio.load(response.data);
	};
}
