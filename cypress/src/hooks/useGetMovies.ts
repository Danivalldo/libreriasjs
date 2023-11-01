import { useState } from "react";
import useRequest from "./useRequest";
import { Movie } from "../types/Movie";

const useGetMovies = () => {
  const { request, isLoading, error } = useRequest();
  const [movies, setMovies] = useState<Movie[]>([]);
  const getMovies = async () => {
    const requestedMovies = await request("./api/");
    if (!requestedMovies) return;
    setMovies(
      requestedMovies.map((movie: Movie) => ({ ...movie, _id: undefined }))
    );
  };
  return { getMovies, movies, isLoading, error };
};

export default useGetMovies;
