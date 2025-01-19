import request from 'supertest';
import { jest, describe, expect, it } from '@jest/globals';

import app from '../app.js';
import { connectDB, closeDB } from "../config/db.js";

beforeAll(async () => { await connectDB(); });
afterAll(async () => { await closeDB(); });

describe('Posts API', () => {
  let token;

  const firstUser = {
    name: 'Posts_user',
    fullname: 'Posts User',
    email: 'posts@example.com',
    password: 'password123',
  };

  describe('Init posts data', () => {
    it('should register user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(firstUser);
      expect(response.status).toBe(201);
    });
    it('should login and return a token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: firstUser.email,
          password: firstUser.password,
        });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      token = response.body.token;
    });
  });
  it.todo('Posts tests');
  describe('Delete posts', () => {
    it('should delete user', async () => {
      const response = await request(app)
        .delete('/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});
