import request from 'supertest';
import { jest, describe, expect } from '@jest/globals';

import app from '../app.js';
import { connectDB, closeDB } from "../config/db.js";

beforeAll(async () => { await connectDB(); });
afterAll(async () => { await closeDB(); });
// jest.setTimeout(60000)

describe('Auth API', () => {
  let token;

  const firstUser = {
    name: 'Auth_user',
    fullname: 'Auth User',
    email: 'auth@example.com',
    password: 'password123',
  };

  describe('POST /auth/register', () => {
    it('should register user', async () => {

      const response = await request(app)
        .post('/auth/register')
        .send(firstUser);

      if (response.status !== 201) {
        console.log('Response body:', response.body);
      }

      expect(response.status).toBe(201);
    });
  });

  describe('POST /auth/login', () => {
    it('should login and return a token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: firstUser.email,
          password: firstUser.password,
        });

      if (response.status !== 200) {
        console.log('Response body:', response.body);
      }

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      token = response.body.token; // Сохраняем токен для дальнейших тестов
    });

    it('should return an error for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: firstUser.email,
          password: 'wrongpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid login data');
    });
  });

  describe('GET /auth/profile', () => {
    it('should return the user profile if authenticated', async () => {
      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(firstUser.email);
    });

    it('should return an error if no token is provided', async () => {
      const response = await request(app).get('/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided, authorization denied');
    });
  });

  describe('PATCH /auth/profile', () => {
    it('should update the user profile if authenticated', async () => {
      const response = await request(app)
        .patch('/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          bio: 'Some bio',
        });

      expect(response.status).toBe(200);
      expect(response.body.user.bio).toBe('Some bio');
    });

    it('should return an error if no token is provided', async () => {
      const response = await request(app)
        .patch('/auth/profile')
        .send({
          email: 'anotheremail@example.com',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided, authorization denied');
    });
  });

  describe('DELETE /auth/profile', () => {
    it('should return an error if no token is provided', async () => {
      const response = await request(app).delete('/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided, authorization denied');
    });

    it('should delete the user profile if authenticated', async () => {
      const response = await request(app)
        .delete('/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User has been successfully deleted');
    });
  });
});
