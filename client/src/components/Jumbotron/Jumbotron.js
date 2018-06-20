import React from "react";
import "./jumbotron.css";

const Jumbotron = ({ children }) => (
  <div className="jumbotron">
      {/* <img src="https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?ixlib=rb-0.3.5&s=1761440f02203fa200090c0f63bd3f3c&auto=format&fit=crop&w=1352&q=80" alt="" /> */}
      {children}
  </div>
);

export default Jumbotron;
