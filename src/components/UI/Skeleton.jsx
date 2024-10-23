import React from "react";

const Skeleton = ({ width, height, borderRadius, top }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        top,
      }}
    ></div>
  );
};

export default Skeleton;
