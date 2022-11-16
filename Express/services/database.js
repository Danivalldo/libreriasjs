let movies = [
  {
    id: 1,
    name: "Star Wars",
    score: 10,
  },
  {
    id: 2,
    name: "Little Miss Sunshine",
    score: 10,
  },
  {
    id: 3,
    name: "Parasite",
    score: 10,
  },
];

export const getAllMovies = () => {
  return movies;
};

export const addMovie = (movie) => {
  //input validation
  const newMovie = {
    id: Date.now(),
    name: typeof movie.name === "string" ? movie.name : "",
    score: typeof movie.score === "number" ? movie.score : 1,
  };
  movies.push(newMovie);
};

export const deleteMovie = (id) => {
  movies = movies.filter((movie) => movie.id !== id);
};
