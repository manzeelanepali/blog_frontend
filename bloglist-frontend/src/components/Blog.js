import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, setBlogs, blogs }) => {
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

  const increasedLikes = (id) => {
    raisedLike(id, blog.likes + 1);
  };

  return (
    <div style={blogStyle}>
      {!display ? (
        <div>
          {blog.title}
          <button onClick={showToggle}>view</button>
        </div>
      ) : (
        <div>
          <div>
            {blog.title}
            <button onClick={showToggle}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{" "}
            <button onClick={() => increasedLikes(blog.id)}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
