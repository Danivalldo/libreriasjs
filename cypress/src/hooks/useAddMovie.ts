import useRequest from "./useRequest";
import { Movie } from "../types/Movie";
import { useState } from "react";

const useAddMovie = () => {
  const [movie, setMovie] = useState<null | Movie>(null);
  const { request, isLoading, error } = useRequest();

  const addMovie = async (movie: Movie) => {
    const createdMovie = await request(`./api`, movie);
    if (!createdMovie) return;
    setMovie(createdMovie);
    return createdMovie;
  };
  return { addMovie, movie, isLoading, error };
};

export default useAddMovie;
