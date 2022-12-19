import { useState } from "react";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreate = (event) => {
    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:{""}
          <input
            id="title"
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:{""}
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:{""}
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id="button-type" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
