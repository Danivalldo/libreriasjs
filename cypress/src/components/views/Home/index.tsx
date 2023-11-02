import { useEffect } from "react";
import useGetMovies from "../../../hooks/useGetMovies";
import styles from "./Home.module.css";
import MovieCard from "../../general/MovieCard";
import Spinner from "../../general/Spinner";

const Home = () => {
  const { getMovies, movies, isLoading, error } = useGetMovies();

  useEffect(() => {
    getMovies();
  }, []);

  const handleOnUpdateMovie = async () => {
    getMovies();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">HOME</h1>
      {isLoading && <Spinner />}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          cy="movie-card"
          onUpdate={handleOnUpdateMovie}
        />
      ))}
    </div>
  );
};

export default Home;
