import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const [message, setErrorMessage] = useState("");
  const [message, setMessage] = useState({ message: null, type: null });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleBlogcreate = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      // console.log("the handeblog entered and newblog", newBlog);
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage({
        message: `a new blog ${createdBlog.title}added by ${createdBlog.author}`,
        type: "update",
      });
      setTimeout(() => {
        setMessage({ message: null, type: null });
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage({ message: exception.response.data.error, type: "error" });
    }
    setTimeout(() => {
      setMessage({ message: null, type: null });
      setMessage(null);
    }, 5000);
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog">
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={(event) => {
            setTitle(event.target.value);
          }}
          handleAuthorChange={(event) => {
            setAuthor(event.target.value);
          }}
          handleUrlChange={(event) => {
            setUrl(event.target.value);
          }}
          createBlog={handleBlogcreate}
        />
      </Togglable>
    );
  };

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

          <button type="submit" onClick={handleBlogcreate}>
            create
          </button>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};
export default App;
