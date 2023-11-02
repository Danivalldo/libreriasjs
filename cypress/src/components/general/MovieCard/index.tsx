import { FC, useCallback } from "react";
import { Movie } from "../../../types/Movie";
import ScoreInput from "../ScoreInput";
import useRateMovie from "../../../hooks/useRateMovie";

interface IPropsMovieCard {
  movie: Movie;
  onUpdate: () => void;
  cy?: string;
}

const MovieCard: FC<IPropsMovieCard> = ({ movie, cy, onUpdate }) => {
  const { rateMovie, isLoading } = useRateMovie();

  const handleOnChangeScore = useCallback(
    async (newScore: number) => {
      await rateMovie({ ...movie }, newScore);
      onUpdate();
    },
    [movie]
  );

  return (
    <div data-cy={cy} data-cy-movie-id={movie.name} className="">
      <h2>{movie.name}</h2>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ScoreInput score={movie.score} onChange={handleOnChangeScore} />
      )}
    </div>
  );
};

export default MovieCard;
