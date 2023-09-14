// eslint-disable-next-line new-cap
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { body, user } = request

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.title || !body.url) {
    return response.status(400).json()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const saveBlog = await blog.save()
  saveBlog.uf = body.url
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()

  response.status(201).json(saveBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  if (request.params.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }

  response.status(401).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { body } = request
  console.log(body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: body.id,
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})



module.exports = blogRouter
