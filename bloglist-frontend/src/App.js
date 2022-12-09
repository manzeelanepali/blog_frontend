import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";

const App = () => {
  const blogFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ message: null, type: null });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  // console.log("blogservices", blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      setUser(user);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      // setErrorMessage("Wrong Credentials");
      setMessage({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };
  // const handleBlogCreate = (blogObject) => {
  //   blogService.create(blogObject).then((returnedBlog) => {
  //     setBlogs(blogs.concat(returnedBlog));
  //     blogFormRef.current.toggleVisibility();
  //   });
  // };

  const raisedLike = async (id, addedlikes) => {
    const updatedBlog = blogs.find((blogs) => blogs.id === id);

    const newBlog = {
      likes: addedlikes,
      author: updatedBlog.author,
      title: updatedBlog.title,
      url: updatedBlog.url,
    };

    const response = await blogService.update(id, newBlog);
    setBlogs(blogs.map((blogs) => (blogs.id === id ? response : blogs)));
  };

  const handleBlogCreate = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    blogFormRef.current.toggleVisibility();
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleBlogCreate} />
      </Togglable>
    );
  };
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message?.message} type={message?.type} />
      {user === null ? (
        <>
          <h2>log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <span>{user.name} logged-in</span>
          <>
            <button onClick={logout}>logout</button>
          </>

          <h1>Create New </h1>
          {blogForm()}

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              blogs={blogs}
              user={user}
              raisedLike={raisedLike}
            />
            // <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};
export default App;
