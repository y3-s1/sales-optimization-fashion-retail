import React from "react";

function ImageCard(props) {
  return (
    <div className="rounded-xl flex items-center justify-center h-full">
      <img
        className="rounded-xl h-20 object-cover"
        src={props.url}
        alt="order-item"
      />
    </div>
  );
}

export default ImageCard;
