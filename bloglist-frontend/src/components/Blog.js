import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdate, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const showVisible = { display: visible ? '' : 'none' }
  const labelButton = visible ? 'hide' : 'show'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }


  const deleteBlg = () => {
    deleteBlog(blog.id)
  }

  const update = () => {
    handleUpdate({
      ...blog,
      likes: blog.likes + 1
    })
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button key={blog.id} onClick={toggleVisible}>{labelButton}</button>
      </div>
      <div style={showVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={update}>like</button></div>
        <button onClick={deleteBlg}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
