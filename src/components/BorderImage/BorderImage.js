import React from "react";
import "./BorderImage.css";

const BorderImage = (prop) => {
  return (
    <div className="borderImage">
        <img src={prop.src} alt={prop.alt} className="borderImage_image" />
    </div>
  );
};

export default BorderImage;