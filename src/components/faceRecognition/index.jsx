import React from "react";
import "./style.css";

function FaceRecognition(props) {
  const { imageUrl } = props;

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img className="rec-image shadow-5" src={imageUrl} alt="" />
      </div>
    </div>
  );
}

export default FaceRecognition;
