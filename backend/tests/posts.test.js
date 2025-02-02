import request from 'supertest';
import { jest, describe, expect, it } from '@jest/globals';

import app from '../app.js';
import { connectDB, closeDB } from "../config/db.js";

beforeAll(async () => { await connectDB(); });
afterAll(async () => { await closeDB(); });

describe('Posts API', () => {
  let token;

  let postId;

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
  describe('Add post', () => {
    it('should add post', async () => {
      const response = await request(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .attach('photo', Buffer.from('a'.repeat(100)), 'test.jpg')
        .field('text', 'Test post');
      expect(response.status).toBe(201);
      postId = response.body.post._id;
    });
  });
  describe('Get posts', () => {
    it('should return posts', async () => {
      const response = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('Get post', () => {
    it('should return post', async () => {
      const response = await request(app)
        .get(`/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.text).toBe('Test post');
    });
  });
  describe('Update post', () => {
    it('should update post', async () => {
      const response = await request(app)
        .patch(`/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          text: 'Updated post',
        });
      expect(response.status).toBe(200);
      expect(response.body.post.text).toBe('Updated post');
    });
  });
  describe('Delete post', () => {
    it('should delete post', async () => {
      const response = await request(app)
        .delete(`/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('Delete posts env', () => {
    it('should delete user', async () => {
      const response = await request(app)
        .delete('/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});
