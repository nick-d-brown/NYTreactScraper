import React from "react";
import "./SaveButton.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveButton = props => (
  <input type="button" value="Save" className="btn btn-success save-button" />
);

export default SaveButton;
