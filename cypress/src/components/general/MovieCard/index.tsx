import { FC, useCallback } from "react";
import { Movie } from "../../../types/Movie";
import ScoreInput from "../ScoreInput";
import useRateMovie from "../../../hooks/useRateMovie";
import useDeleteMovie from "../../../hooks/useDeleteMovie";
import Spinner from "../Spinner";
import Toastify from "toastify-js";

interface IPropsMovieCard {
  movie: Movie;
  cy?: string;
  onUpdate: () => void;
  onDelete: () => void;
}

const MovieCard: FC<IPropsMovieCard> = ({ movie, cy, onUpdate, onDelete }) => {
  const { rateMovie, isLoading } = useRateMovie();
  const {
    deleteMovie,
    isLoading: isDeletingMovie,
    error: errorDeletingMovie,
  } = useDeleteMovie();

  const handleOnChangeScore = useCallback(
    async (newScore: number) => {
      await rateMovie({ ...movie }, newScore);
      onUpdate();
    },
    [movie]
  );

  const handleOnDeleteMovie = useCallback(
    async (movieId: string) => {
      const deletedMovie = await deleteMovie(movieId);
      if (deletedMovie) {
        Toastify({
          text: "Movie deleted",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          className: "toast-success",
        }).showToast();
        onDelete();
      }
    },
    [movie]
  );

  return (
    <div data-cy={cy} data-cy-movie-id={movie.name} className="">
      {isDeletingMovie ? (
        <Spinner />
      ) : (
        <>
          <div className="flex gap-4">
            <h2>{movie.name}</h2>
            <button
              data-cy="delete-movie-btn"
              onClick={handleOnDeleteMovie.bind(this, movie.id)}
            >
              Delete
            </button>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <ScoreInput score={movie.score} onChange={handleOnChangeScore} />
          )}
        </>
      )}
    </div>
  );
};

export default MovieCard;
