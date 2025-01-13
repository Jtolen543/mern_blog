const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {listBlogs} = require('../utils/blog_helper')
const api = supertest(app)

describe('When there are initially some blogs saved', () => {
  beforeEach(async() => {
    await Blog.deleteMany({url: "http://test.com"})
    await Blog.insertMany(listBlogs)
    console.log("Saved new blogs")
  })

  test('blogs are returned as json', async() => {
    await api.get("/api/blogs").expect(200).expect('Content-Type', /application\/json/)
  })

  describe("viewing a specific blog", () => {

    test('a specific blog can be viewed', async() => {
      const blogs = await api.get("/api/blogs")
      const blogToView = blogs.body[0]
      const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
      assert.deepStrictEqual(blogToView, resultBlog.body[0])
    })

    test('a specific blog can be deleted', async() => {
      const blogs = await api.get("/api/blogs")
      const blogToDelete = blogs.body[0]
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    })

    test('Blog contains id field', async() => {
      const temp = await api.get("/api/blogs")
      assert.ok(temp.body[0].id)
    })

    test("Blog does not exist", async() => {
      await api.get("/api/blogs/123456").expect(400)
    }) 
    
    test("Blog can be updated", async() => {
      const temp = await api.get("/api/blogs")
      const blogToUpdate = temp.body[0]
      const updatedBlog = {
        title: "Updated Blog",
        author: 'Updated Author',
        likes: 10
      }
      await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
    })  
  })

  test('blogs returns correct amount', async() => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, 4)

  })

  test('Blog can be added', async() => {
    const newBlog = {
      title: "Test Blog 5",
      author: "Test Author 5",
      url: "http://test.com",
      likes: 5
    }
    await api.post("/api/blogs").send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  })

  test('Blog likes default to 0', async() => {
    const newBlog = {
      title: "Test Blog 5",
      author: "Test Author 5",
      url: "http://test.com"
    }
    const response = await api.post("/api/blogs").send(newBlog)
    assert.ok(response.body.likes === 0)
  })

  test('Blog title and url are required', async() => {
    await api.post("/api/blogs").send({author: "Test Author 5"}).expect(400)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
