import { useEffect } from "react";
import useGetMovies from "../../../hooks/useGetMovies";
import styles from "./Home.module.css";

const Home = () => {
  const { getMovies, movies, isLoading, error } = useGetMovies();

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">HOME</h1>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.name}</div>
      ))}
    </div>
  );
};

export default Home;
