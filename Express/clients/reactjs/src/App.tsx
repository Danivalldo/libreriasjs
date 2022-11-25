import React from "react";
import logo from "./logo.svg";
import "./App.sass";
import useMovies from "./hooks/useMovies";

function App() {
  const { getMovies, error, isLoading } = useMovies();

  const handleClickGetMovies = () => {
    getMovies();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <button onClick={handleClickGetMovies}>GET MOVIES</button>
        {isLoading && <div>Loading</div>}
        {error && <div>{error}</div>}
      </header>
    </div>
  );
}

export default App;
