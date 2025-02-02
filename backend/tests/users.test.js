import request from "supertest";
import { jest, describe, expect, it } from "@jest/globals";

import app from "../app.js";
import { connectDB, closeDB } from "../config/db.js";

beforeAll(async () => {
  await connectDB();
});
afterAll(async () => {
  await closeDB();
});

describe("User API", () => {
  let token;
  let secondToken;
  let userId;
  let secondUserId;

  const firstUser = {
    name: "First_user",
    fullname: "First User",
    email: "first@example.com",
    password: "password123",
  };

  const secondUser = {
    name: "Second_user",
    fullname: "Second User",
    email: "second@example.com",
    password: "password321",
  };

  describe("Create two users", () => {
    it("should register first user", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send(firstUser);
      expect(response.status).toBe(201);
    });
  });
  it("should register second user", async () => {
    const response = await request(app).post("/auth/register").send(secondUser);
    expect(response.status).toBe(201);
  });

  describe("Login users", () => {
    it("should login first user", async () => {
      const response = await request(app).post("/auth/login").send({
        email: firstUser.email,
        password: firstUser.password,
      });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      token = response.body.token;
    });
    it("should login second user", async () => {
      const response = await request(app).post("/auth/login").send({
        email: secondUser.email,
        password: secondUser.password,
      });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      secondToken = response.body.token;
    });
    it("should get first user profile", async () => {
      const response = await request(app)
        .get("/auth/profile")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      userId = response.body._id;
    });
    it("should get second user profile", async () => {
      const response = await request(app)
        .get("/auth/profile")
        .set("Authorization", `Bearer ${secondToken}`);
      expect(response.status).toBe(200);
      secondUserId = response.body._id;
    });
  });

  it.todo("Follow users");
  // describe('Follow users', () => {
  //   it('should follow second user', async () => {
  //     const response = await request(app)
  //       .post(`/users/${secondUserId}/follow`)
  //       .set('Authorization', `Bearer ${token}`);
  //     expect(response.status).toBe(200);
  //   });
  //   it('should follow first user', async () => {
  //     const response = await request(app)
  //       .post(`/users/${userId}/follow`)
  //       .set('Authorization', `Bearer ${secondToken}`);
  //     expect(response.status).toBe(200);
  //   });
  //   it('should unfollow first user', async () => {
  //     const response = await request(app)
  //       .delete(`/users/${userId}/follow`)
  //       .set('Authorization', `Bearer ${secondToken}`);
  //     expect(response.status).toBe(200);
  //   });
  // });

  describe("Get users", () => {
    it("should get users list", async () => {
      const response = await request(app)
      .get("/users/")
      .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
    it.todo("should search for users");
    it("should get first user", async () => {
      const response = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(firstUser.name);
      // expect(response.body.following).toBe(1);
      // expect(response.body.followers).toBe(0);
    });
    it("should get second user", async () => {
      const response = await request(app)
        .get(`/users/${secondUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(secondUser.name);
      // expect(response.body.following).toBe(0);
      // expect(response.body.followers).toBe(1);
    });
  });

  describe("Delete users", () => {
    it("should delete both users", async () => {
      const response = await request(app)
        .delete("/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      const response2 = await request(app)
        .delete("/auth/profile")
        .set("Authorization", `Bearer ${secondToken}`);

      expect(response2.status).toBe(200);
    });
  });
});
