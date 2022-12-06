import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blogs", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "sunaina",
    url: "www.jpt.com",
    likes: 0,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );

  expect(div).toBeDefined();
});
