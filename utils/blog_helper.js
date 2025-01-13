const Blog = require("../models/blog")


const listBlogs = [
    {
        title: "Test Blog 1",
        author: "Test Author 1",
        url: "http://test.com",
        likes: 1
    },
    {
        title: "Test Blog 2",
        author: "Test Author 2",
        url: "http://test.com",
        likes: 2
    },
    {
        title: "Test Blog 3",
        author: "Test Author 3",
        url: "http://test.com",
        likes: 3
    },
    {
        title: "Test Blog 4",
        author: "Test Author 4",
        url: "http://test.com",
        likes: 4
    },
]

const listUsers = [
    {
        username: "testuser1",
        name: "Test User",
        password: "TestUser1234",
    },
    {
        username: "testuser2",
        name: "Test User",
        password: "TestUser1234",
    },
    {
        username: "testuser3",
        name: "Test User",
        password: "TestUser1234",
    },
]

module.exports = {
    listBlogs,
    listUsers
}