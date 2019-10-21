import React, { useState } from "react";
import Navigation from "./components/navigation";
import Logo from "./components/logo";
import ImageLinkForm from "./components/imageLinkForm";
import Rank from "./components/rank";
import FaceRecognition from "./components/faceRecognition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");

  const app = new Clarifai.App({
    apiKey: "6148386ae78c431b84a9b6ecf895933a"
  });

  const onInputBlur = e => {
    setImageUrl(e.target.value);
  };

  const onButtonSubmit = e => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl).then(
      function(response) {
        console.log(response.outputs[0].data.regions);
      },
      function(err) {
        // there was an error
      }
    );
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputBlur={onInputBlur}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
