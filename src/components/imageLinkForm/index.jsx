import React from "react";
import "./style.css";

function ImageLinkForm(props) {
  const { onInputBlur, onButtonSubmit } = props;

  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5 form center">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onBlur={onInputBlur}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
