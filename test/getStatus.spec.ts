import { mainURL } from '../src/index';
import { Client } from '../src/utils';

describe('getStatus function', () => {
	const response = new Client();

	it('should exists', () => {
		expect(response).toBeDefined();
	});
	it('should return a response status', async () => {
		await expect(response.isConnected(mainURL)).resolves.toBe(200);
	});
});
