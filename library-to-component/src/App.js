import { useState } from "react";

import ScratchCard from "./components/ScratchCard";

function App() {
  const [active, setActive] = useState(true);
  const [radius, setRadius] = useState(20);
  const [frontImage, setFrontImage] = useState(
    "https://picsum.photos/id/60/500/500"
  );
  const [backImage, setBackImage] = useState(
    "https://picsum.photos/id/89/500/500"
  );

  const handleOnScratchStart = () => {
    console.log("Scratch start");
  };
  const handleOnScratchEnd = () => {
    console.log("Scratch end");
  };
  const handleOnScratching = () => {
    console.log("Scratching");
  };

  return (
    <div className="App">
      {active && (
        <ScratchCard
          frontImage={frontImage}
          backImage={backImage}
          radius={radius}
          style={{ width: 700, height: 700 }}
          className="cont-a"
          onScratchEnd={handleOnScratchEnd}
          onScratchStart={handleOnScratchStart}
          onScratching={handleOnScratching}
        />
      )}
      <div className="ui">
        <div>
          <span className="font-bold">Activo:</span>
          <input
            type="checkbox"
            checked={active}
            onChange={() => {
              setActive((prevActive) => {
                return !prevActive;
              });
            }}
          />
        </div>
        <hr />
        <div>
          <label htmlFor="">Imagen superpuesta</label>
          <input
            type="text"
            value={frontImage}
            onChange={(e) => {
              if (!e.currentTarget.value) {
                return;
              }
              setFrontImage(e.currentTarget.value);
            }}
          />
          <hr />
          <label htmlFor="">Imagen oculta</label>
          <input
            type="text"
            value={backImage}
            onChange={(e) => {
              if (!e.currentTarget.value) {
                return;
              }
              setBackImage(e.currentTarget.value);
            }}
          />
        </div>
        <hr />
        <label htmlFor="">Radio del pincel</label>
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
      <hr />
      <div>
        <h2 className="text-center">Más ejemplos</h2>
      </div>
      <ScratchCard
        frontImage={"textures/front-image.png"}
        backImage={"textures/back-image.png"}
        radius={25}
        style={{ width: 737, height: 393 }}
        className="cont-a"
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
