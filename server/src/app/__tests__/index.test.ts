import request from 'supertest';
import serverPromise from '../index';

describe('express server', () => {
  afterAll(async () => {
    const server = await serverPromise;
    server.close();
  });

  it('calls the /test route', async () => {
    const server = await serverPromise;
    const agent = request.agent(server);
    const response = await agent.get('/performance/test');

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.headers['content-length']).toBe('16');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});
