import { getResponse, mainURL } from '../index';

describe('getStatus function', () => {
	const response = new getResponse();

	it('should exists', () => {
		expect(response).toBeDefined();
	});
	it('should return a response status', async () => {
		await expect(response.isConnected(mainURL)).resolves.toBe(200);
	});
});
