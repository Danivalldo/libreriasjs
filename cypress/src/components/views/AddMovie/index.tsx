import { FormEventHandler, useCallback, useState } from "react";
import ScoreInput from "../../general/ScoreInput";
import useAddMovie from "../../../hooks/useAddMovie";
import Button from "../../general/Button";
import Spinner from "../../general/Spinner";
import { Navigate } from "react-router-dom";
import Toastify from "toastify-js";
import Input from "../../general/Input";

const AddMovie = () => {
  const [score, setScore] = useState(1);
  const { addMovie, movie, isLoading } = useAddMovie();

  const handleOnChangeScore = (score: number) => {
    setScore(score);
  };

  const handleOnSubmitAddMovie: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const newMovie = await addMovie({
        id: "",
        name: (e.currentTarget.elements.namedItem("movieName") as RadioNodeList)
          .value,
        score: score,
        createdBy: "",
      });
      if (newMovie) {
        Toastify({
          text: "New movie created",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          className: "toast-success",
        }).showToast();
      }
    },
    [score]
  );

  if (movie) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <form onSubmit={handleOnSubmitAddMovie}>
          <Input type="text" placeholder="MovieName" name="movieName" />
          <ScoreInput score={score} onChange={handleOnChangeScore} />
          <Button type="submit" cy="create-movie-btn">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddMovie;
