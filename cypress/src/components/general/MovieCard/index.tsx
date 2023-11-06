import { FC, useCallback } from "react";
import { Movie } from "../../../types/Movie";
import ScoreInput from "../ScoreInput";
import useRateMovie from "../../../hooks/useRateMovie";
import useDeleteMovie from "../../../hooks/useDeleteMovie";
import Trash from "../../icons/Trash";
import Spinner from "../Spinner";
import Toastify from "toastify-js";
import Button from "../Button";

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
    <div
      data-cy={cy}
      data-cy-movie-id={movie.name}
      className="hover:scale-105 transition-transform"
    >
      {isDeletingMovie ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-gray-900 text-white rounded-xl shadow-md overflow-hidden m-5">
            <div className="md:flex md:flex-col">
              {movie.poster && (
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-full"
                    src={movie.poster}
                    alt="Movie image"
                  />
                </div>
              )}
              <div className="p-8 flex gap-4 justify-between">
                <div>
                  <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {movie.name}
                  </h2>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <ScoreInput
                      score={movie.score}
                      onChange={handleOnChangeScore}
                    />
                  )}
                </div>
                <div>
                  <Button
                    cy="delete-movie-btn"
                    onClick={handleOnDeleteMovie.bind(this, movie.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
