import React from "react";

const Skeleton = ({ width, height, borderRadius, top, left }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        top,
        left
      }}
    ></div>
  );
};

export default Skeleton;
