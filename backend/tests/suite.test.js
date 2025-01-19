import request from 'supertest';
import { jest, describe, expect, it } from '@jest/globals';

import app from '../app.js';
import { connectDB, closeDB } from "../config/db.js";

beforeAll(async () => { await connectDB(); });
afterAll(async () => { await closeDB(); });

describe('Test suite', () => {
  // Complex test scenario
  //
  // Create and login three users
  // First user follows second and third users
  // Second user follows third users
  // Third user follows no one
  // Each users creates 1 post
  // First user likes and comments each post
  // Second user likes and comments each post, then unlikes and deletes comment for second post
  // Make sure that each user has correct list of posts in the feed
  // Make sure that each post has correct list of likes and comments
  // Make sure that each user has correct list of followers and followings
  // Make sure that each user has correct list of own posts
  it.todo('should be implemented');
});

