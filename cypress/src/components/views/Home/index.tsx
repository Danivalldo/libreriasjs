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

  const handleOnDeleteMovie = async () => {
    getMovies();
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            cy="movie-card"
            onUpdate={handleOnUpdateMovie}
            onDelete={handleOnDeleteMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
