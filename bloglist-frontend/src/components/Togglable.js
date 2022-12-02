import React from "react";

const Togglable = (props) => {
  return (
    <div>
      <h1>This is coming from togglable component</h1>
      {props.children}
    </div>
  );
};

export default Togglable;
