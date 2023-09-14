import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }
