import { useState } from "react";
const Blog = ({ blog }) => {
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
            likes: {blog.likes} <button>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
