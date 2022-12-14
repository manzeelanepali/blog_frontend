import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const heythere = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={heythere} />);

  const input = screen.getByPlaceholderText("textbox");
  const sendButton = screen.getByText("create");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(heythere.mock.calls).toHaveLength(1);
  //   console.log("hey ", heythere.mock.calls[0]);

  expect(heythere.mock.calls[0][0].title).toBe("testing a form...");
  //   console.log("hey ", heythere.mock.calls);
});
