import { useState } from "react";

import ScratchCard from "./components/ScratchCard";

function App() {
  const [active, setActive] = useState(true);
  const [radius, setRadius] = useState(10);
  const [frontImage, setFrontImage] = useState("textures/front-image.png");
  const [backImage, setBackImage] = useState("textures/back-image.png");

  const handleChangeImage = () => {
    setFrontImage(
      "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
    );
    setBackImage(
      "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
    );
  };
  const handleOnScratchStart = () => {
    console.log("scratch start");
  };
  const handleOnScratchEnd = () => {
    console.log("scratch end");
  };
  const handleOnScratching = () => {
    console.log("scratching");
  };

  return (
    <div className="App">
      {active && (
        <ScratchCard
          frontImage={frontImage}
          backImage={backImage}
          radius={radius}
          style={{ width: 737, height: 393 }}
          onScratchStart={handleOnScratchStart}
          onScratchEnd={handleOnScratchEnd}
          onScratching={handleOnScratching}
          className="cont-a"
        />
      )}
      <button onClick={handleChangeImage}>Change Images</button>
      <button
        onClick={() => {
          setActive((prevActive) => {
            return !prevActive;
          });
        }}
      >
        Toggle Active
      </button>
      <input
        type="range"
        min={5}
        max={50}
        value={radius}
        onChange={(e) => {
          setRadius(e.currentTarget.value);
        }}
      />
      <ScratchCard
        frontImage={"textures/blurred_dog.png"}
        backImage={"textures/dog.png"}
        radius={50}
        style={{ width: 737, height: 823 }}
        className="cont-a"
      />
    </div>
  );
}

export default App;
