import { useState } from "react";

import ScratchCard from "./components/ScratchCard";

function App() {
  const [active, setActive] = useState(true);
  const [radius, setRadius] = useState(10);
  const [frontImage, setFrontImage] = useState("textures/bg_grass.jpeg");
  const [backImage, setBackImage] = useState("textures/bg_rotate.jpeg");

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
          style={{ height: 400 }}
          onScratchStart={handleOnScratchStart}
          onScratchEnd={handleOnScratchEnd}
          onScratching={handleOnScratching}
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
    </div>
  );
}

export default App;
