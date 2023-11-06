import {
  ChangeEvent,
  FormEventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import ScoreInput from "../../general/ScoreInput";
import useAddMovie from "../../../hooks/useAddMovie";
import Button from "../../general/Button";
import Spinner from "../../general/Spinner";
import { Navigate } from "react-router-dom";
import Toastify from "toastify-js";
import Input from "../../general/Input";

const AddMovie = () => {
  const [score, setScore] = useState(1);
  const [poster, setPoster] = useState<string>("");
  const [isValidPoster, setIsValidPoster] = useState<boolean>(false);
  const { addMovie, movie, isLoading, error } = useAddMovie();

  useEffect(() => {
    if (!error) return;
    Toastify({
      text: error,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      className: "toast-error",
    }).showToast();
  }, [error]);

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
        poster,
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
    [score, poster]
  );

  if (movie) {
    return <Navigate to="/" />;
  }

  const handleOnLoadImage: ReactEventHandler = () => {
    setIsValidPoster(true);
  };

  const handleOnChangePoser = (e: ChangeEvent<HTMLInputElement>) => {
    setPoster(e.target.value);
  };

  const handleErrorLoadImage: ReactEventHandler = () => {
    setIsValidPoster(false);
  };

  return (
    <div className="h-full flex justify-center">
      {isLoading && <Spinner />}
      {!isLoading && (
        <form
          onSubmit={handleOnSubmitAddMovie}
          className="block max-w-md w-full mx-auto mt-10 text-center my-auto bg-slate-900 p-5 rounded-lg shadow-sm"
        >
          <Input
            type="text"
            placeholder="Nombre de la película"
            name="movieName"
          />
          <Input
            type="text"
            placeholder="Poster"
            name="poster"
            value={poster}
            onChange={handleOnChangePoser}
          />
          <div>
            <img
              src={poster}
              alt=""
              className={``}
              onLoad={handleOnLoadImage}
              onError={handleErrorLoadImage}
              style={{ visibility: isValidPoster ? "visible" : "hidden" }}
            />
          </div>
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
