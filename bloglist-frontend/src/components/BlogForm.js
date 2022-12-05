const BlogForm = ({
  createBlog,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleBlogcreate,
}) => {
  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title:{""}
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{""}
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{""}
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" onClick={handleBlogcreate}>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
