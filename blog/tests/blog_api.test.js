const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('post blog', async () => {
  const newBlog = {
    title: 'HTML is easy',
    author: 'huy',
    likes: 10,
  }

  if (!newBlog.title || !newBlog.url) {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  } else {
    const blog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    if (!newBlog.likes) {
      expect(blog.body.likes).toBe(0)
    }

    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(helper.initialBlogs.length + 1)
  }
})

test('remove', async () => {
  const blog = await helper.blogInDb()
  const deleteBlog = blog[0]
  await api.delete(`/api/blogs/${deleteBlog.id}`)
    .expect(204)

  const result = await api.get('/api/blogs')
  expect(result.body).toHaveLength(helper.initialBlogs.length - 1)
})

test('update', async () => {
  const blog = await helper.blogInDb()
  const updateBlog = blog[0]
  updateBlog.likes = 1000
  const result = await api.put(`/api/blogs/${updateBlog.id}`).send(updateBlog)
  expect(result.body).toEqual(updateBlog)
})

afterAll(async () => {
  await mongoose.connection.close()
})
