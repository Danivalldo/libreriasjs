import { useState } from "react";

const useMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const getMovies = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(`./api/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "xxxxxx",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMovies(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, movies, getMovies };
};

export default useMovies;
