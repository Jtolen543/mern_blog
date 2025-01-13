const { test, after, beforeEach, describe } = require('node:test')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {listUsers} = require('../utils/blog_helper')
const api = supertest(app)



describe("When a user is added", () => {
    beforeEach(async () => {
      await User.deleteMany({name: "Test User"})
      await User.insertMany(listUsers)
  
    })

    test("User can be added and displayed as JSON format", async () => {
      const testUser = {
        username: "Test User 4",
        name: "Test User",
        password: "testing1234"
      }
      await api.post("/api/users").send(testUser).expect(201).expect("Content-Type", /application\/json/)
    })
    
    after(async () => {
        await mongoose.connection.close()
    })
}) 