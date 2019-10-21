import React from "react";
import Tilt from "react-tilt";
import "./style.css";
import brainIcon from "../../assets/brain-64.png";

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img alt="logo" src={brainIcon}></img>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
