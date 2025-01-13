const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }   
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.find({_id: request.params.id})
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }   
})

blogRouter.post('/', async (request, response) => {
    // The request body contains the data sent in the POST request
    const user = await User.findOne({})
    const blog = new Blog({
        ...request.body,
        user: user.id
    })
    user.blogs.push(blog.id)
    // Save the new blog instance to the database
    await blog.save()
    await user.save()
    const populated = await blog.populate('user')
    if (blog) {
        response.status(201).json(populated)
    } else {
        response.status(400).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    if (blog) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter