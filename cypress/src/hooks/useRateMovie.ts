import useRequest from "./useRequest";
import { Movie } from "../types/Movie";

const useRateMovie = () => {
  const { request, isLoading, error } = useRequest();

  const rateMovie = async (movie: Movie, score: number) => {
    const updatedMovie = await request(
      `./api/${movie.id}`,
      { ...movie, score },
      "PUT"
    );
    if (!updatedMovie) return;
    return updatedMovie;
  };
  return { rateMovie, isLoading, error };
};

export default useRateMovie;
