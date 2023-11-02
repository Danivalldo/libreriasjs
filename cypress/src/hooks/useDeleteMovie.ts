import { useState } from "react";
import useRequest from "./useRequest";
import { Movie } from "../types/Movie";

const useDeleteMovie = () => {
  const { request, isLoading, error } = useRequest();
  const deleteMovie = async (movieId: string) => {
    const deletedMovie = await request(`./api/${movieId}`, undefined, "DELETE");
    if (!deletedMovie) return;
    return deletedMovie;
  };
  return { deleteMovie, isLoading, error };
};

export default useDeleteMovie;
