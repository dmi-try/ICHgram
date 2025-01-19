import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';

describe('GET /', () => {
  it('should respond with "Hi there!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hi there!');
  });
});
