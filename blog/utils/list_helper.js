const dummy = () => 1

const totalLikes = Blog => Blog.map(blog => blog.likes)[0]

const favoriteBlog = listBlogs => {
  const mostLike = listBlogs.reduce((acc, blog) => blog.likes > acc.likes ? blog : acc)
  return {
    author: mostLike.author,
    likes: mostLike.likes,
    title: mostLike.title,
  }
}

const mostBlogs = listBlogs => {
  const blog = listBlogs.reduce(
    (prev, current) => {
      prev[current.author] = prev[current.author] ? prev[current.author] + 1 : 1
      return prev
    },
    {},
  )
  const arrayNumberBlogs = Object.values(blog)
  const maxBlog = Math.max(...arrayNumberBlogs)
  const nameAuthormostBlogs = Object.keys(blog).find(key => blog[key] === maxBlog)

  return {
    author: nameAuthormostBlogs,
    blogs: maxBlog,
  }
}

const mostLikes = listBlogs => {
  const blog = listBlogs.reduce(
    (prev, current) => {
      prev[current.author] = prev[current.author] ? prev[current.author] + current.likes : current.likes
      return prev
    },
    {},
  )
  const arrayNumberBlogs = Object.values(blog)
  const mostLikes = Math.max(...arrayNumberBlogs)
  const nameAuthormostBlogs = Object.keys(blog).find(key => blog[key] === mostLikes)

  return {
    author: nameAuthormostBlogs,
    likes: mostLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
