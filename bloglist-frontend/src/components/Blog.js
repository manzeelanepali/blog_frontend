import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, setBlogs, user, raisedLike, blogs }) => {
  const [display, setDisplay] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const showToggle = () => {
    setDisplay(!display);
  };
  // const raisedLike = async (id, addedlikes) => {
  //   const updatedBlog = blogs.find((blogs) => blogs.id === id);

  //   const newBlog = {
  //     likes: addedlikes,
  //     author: updatedBlog.author,
  //     title: updatedBlog.title,
  //     url: updatedBlog.url,
  //   };

  //   const response = await blogService.update(id, newBlog);
  //   setBlogs(blogs.map((blogs) => (blogs.id === id ? response : blogs)));
  // };

  const increasedLikes = (id) => {
    raisedLike(id, blog.likes + 1);
  };

  const deletedBlog = async (id) => {
    // console.log("de", id);

    await blogService.remove(id);

    setBlogs(blogs.filter((blog) => blog.id !== id));
  };
  // console.log(blog.id, "comparison");

  // console.log("deleted blog", deletedBlog);

  return (
    <div style={blogStyle}>
      {!display ? (
        <div>
          <li className="blog">
            {blog.title}
            {blog.author}
            <button className="view" onClick={showToggle}>
              view
            </button>
            {/* <button className="view" onClick={showToggle} /> */}
          </li>
        </div>
      ) : (
        <div>
          <div>
            {blog.title}
            <button onClick={showToggle}>hide</button>
          </div>
          <div className="url">{blog.url}</div>

          <div className="likes">
            likes: {blog.likes}
            {/* <button onClick={() => increasedLikes(blog.id)}>like</button> */}
            <button id="likeButton" onClick={() => increasedLikes(blog.id)}>
              {" "}
              like
            </button>
          </div>
          <div>{blog.author}</div>
          <div>
            <button
              style={{ backgroudColor: "red" }}
              onClick={() => {
                const del = window.confirm(
                  `Remove blog ${blog.title} by ${blog.author}`
                );
                if (del === false) {
                  return blogs;
                } else {
                  deletedBlog(blog.id);
                }
              }}
            >
              remove
            </button>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default Blog;
