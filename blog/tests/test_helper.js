const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'title',
    author: 'huy',
    url: 'ertyu',
    likes: 78,
  },
  {
    title: 'title2',
    author: 'huy2',
    url: 'ertyu2',
    likes: 782,
  },
]

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogInDb,
}
