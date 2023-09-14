import {useState, useEffect, useRef} from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const createBlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  console.log(234);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("wrong credentials");
      setMessage({ text: "wrong credentials", type: "error" });
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleCreate = async (handleCreate) => {
    try {
      createBlogFormRef.current.toggleVisible()
      const blog = await blogService.createBlog(handleCreate);
      setBlogs(blogs.concat(blog));
      setMessage({ text: "created successfully", type: "info" });
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setMessage({ text: "wrong info to create", type: "error" });
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleUpdate = async (updateBlog) => {
    const blog = await blogService.updateBlog(updateBlog);
    setBlogs(blogs.map(blog => blog.id === updateBlog.id ? updateBlog : blog));
  }

  const deleteBlog = async (id) => {
    const response = await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const formLogin = () => (
    <form onSubmit={handleSubmit}>
      <h2>login to application</h2>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );

  blogs.sort((first, second) => second.likes - first.likes)

  const formBlog = () => (
    <Togglable ref={createBlogFormRef}>
      <CreateBlogForm handleCreate={handleCreate}/>
    </Togglable>
  );
  return (
    <div>
      <div className={message?.type}>{message?.text}</div>
      {!user && formLogin()}
      {user && (
          <div>
            <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
            {formBlog()}
          </div>
      )}
      {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} deleteBlog={deleteBlog} />
      ))}
    </div>
  );
};

export default App;
