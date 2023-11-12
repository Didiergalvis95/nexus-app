import React from "react";
import "./Slide.css";

const Slide = ({ clubImages, clubImageRefs }) => {
  return (
    <div className="clubs">
      {clubImages.map((image, index) => (
        <img
          key={index}
          ref={clubImageRefs[index]}
          className={`image-${index}`}
          alt={`Club ${index}`}
          src={image}
        />
      ))}
    </div>
  );
};

export default Slide;
