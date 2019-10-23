import React, { useState } from "react";
import Navigation from "./components/navigation";
import Logo from "./components/logo";
import ImageLinkForm from "./components/imageLinkForm";
import Rank from "./components/rank";
import FaceRecognition from "./components/faceRecognition";
import Signin from "./components/signin";
import Register from "./components/register";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import particlesOptions from "./assets/ParticlesOptions.json";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const app = new Clarifai.App({
    apiKey: process.env.REACT_APP_API_KEY
  });

  const resetBoxes = () => {
    const imageContainer = document.getElementById("inputimage");

    let boxes = imageContainer.getElementsByTagName("DIV");
    let boxesLength = boxes.length;
    for (let index = 0; index < boxesLength; index++) {
      boxes[0].remove();
    }
  };

  const displayFaceBoxes = data => {
    const imageContainer = document.getElementById("inputimage");
    const image = imageContainer.getElementsByTagName("IMG")[0];
    const width = Number(image.width);
    const height = Number(image.height);

    resetBoxes();

    for (const d of data) {
      const boundingBox = d.region_info.bounding_box;

      const leftCol = boundingBox.left_col * width;
      const topRow = boundingBox.top_row * height;
      const rightCol = width - boundingBox.right_col * width;
      const bottomRow = height - boundingBox.bottom_row * height;

      const style = `top: ${topRow}px; right: ${rightCol}px; bottom: ${bottomRow}px; left: ${leftCol}px;`;

      const box = document.createElement("DIV");
      box.className = "bounding-box";
      box.setAttribute("style", style);

      imageContainer.appendChild(box);
    }
  };

  const onInputBlur = e => {
    resetBoxes();
    setImageUrl(e.target.value);
  };

  const onButtonSubmit = e => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
      .then(response => displayFaceBoxes(response.outputs[0].data.regions))
      .catch(err => console.log("err", err));
  };

  const onRouteChange = route => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputBlur={onInputBlur}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
