import React from "react";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => (
  <div className="loading-block-container">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="loading-block"></div>
    ))}
  </div>
);
export default LoadingSpinner;
