import { useEffect } from "react";
import useGetMovies from "../../../hooks/useGetMovies";
import styles from "./Home.module.css";
import MovieCard from "../../general/MovieCard";
import Spinner from "../../general/Spinner";
import NoMovies from "../../icons/NoMovies";

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
      {isLoading && (
        <div className="absolute bottom-10 right-5">
          <Spinner />
        </div>
      )}
      <div className={styles.moviesGrid}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              cy="movie-card"
              onUpdate={handleOnUpdateMovie}
              onDelete={handleOnDeleteMovie}
            />
          ))
        ) : (
          <div className="text-center pt-4">
            <NoMovies width={240} height={240} className={"mx-auto"} />
            <p>Aún no has añadido ninguna película</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
