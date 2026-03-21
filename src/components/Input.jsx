import React from "react";

const Input = ({ type = "text", placeholder, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input"
      {...props}
    />
  );
};

export default Input;