import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  console.log("blogservices", blogs);

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

      //  user ahunu sath we will call the setToken

      blogService.setToken(user.token);
      setUser(user);

      // browser ko api ho . loggedBlogapp user bhanee key ma as a key value ko form ma token and other info like name and username ahucha.
      // json.stringify  . user actually object ko format ma ahucha so this will convert the text into string
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  // function logout removes the useer from the local storage

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} />
      {user === null ? (
        <>
          <h2>log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          {/* <h2>{user.name} logged-in</h2> */}
          {/*  span for the inline alignment  */}
          <span>{user.name} logged-in</span>
          {/*  made a button that has onclick property to logout . it has a function logout in it  */}
          <button onClick={logout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};
export default App;
