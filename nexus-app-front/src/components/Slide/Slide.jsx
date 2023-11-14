import React from "react";
import "./Slide.css";

const Slide = ({ clubImages, clubImageRefs, textImages }) => {
  return (
    <div className="clubs">
      {clubImages.map((image, index) => (
        <div key={index} className="image-container">
          <img
            ref={clubImageRefs[index]}
            className={`image-${index}`}
            alt={`Club ${index}`}
            src={image}
          />
          <div className="image-text">
            <p>{textImages[index]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slide;
