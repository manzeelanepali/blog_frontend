import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("clicking the button calls event handler once", async () => {
  const blog = {
    title: " its going to be great",
    author: "sonika ",
    url: "j payo tei",
    likes: 0,
    user: {
      username: "prem",
      name: "prem",
      id: "fmndmn",
    },
  };

  const User = {
    username: "prem",
    name: "prem",
    id: "fmndmn",
  };

  const { container } = render(<Blog blog={blog} user={User} />);
  const user = userEvent.setup();
  const button = container.querySelector(".view");
  await user.click(button);
  const url = container.querySelector(".url");
  const likes = container.querySelector(".likes");

  expect(url).toHaveTextContent("j payo tei");
  expect(likes).toHaveTextContent("0");
});
