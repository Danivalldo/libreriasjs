import { Link, Navigate } from "react-router-dom";
import styles from "./Login.module.sass";
import { FormEventHandler, useContext, useEffect } from "react";
import { TokenContext } from "../../../context/TokenContext";
import useRequest from "../../../hooks/useRequest";
import Input from "../../general/Input";
import Button from "../../general/Button";
import Movie from "../../icons/Movie";
import Toastify from "toastify-js";

const Login = () => {
  const { token, setToken } = useContext(TokenContext);
  const { request, isLoading, error } = useRequest();

  if (token) {
    return <Navigate to="/" />;
  }

  const handleOnSubmitLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const credentials = {
      username: (
        e.currentTarget.elements.namedItem("username") as RadioNodeList
      ).value,
      pass: (e.currentTarget.elements.namedItem("password") as RadioNodeList)
        .value,
    };

    const tokenResponse = await request("./signin", credentials);
    if (tokenResponse) {
      setToken(tokenResponse.token);
    }
  };

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

  return (
    <div className={`${styles.loginView} flex justify-center items-center`}>
      <form
        className="bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-lg text-center"
        onSubmit={handleOnSubmitLogin}
      >
        <div className="m-auto">
          <Movie />
        </div>
        <div className="mb-3">
          <Input type="text" name="username" placeholder="Email" />
          <Input type="password" name="password" placeholder="Contraseña" />
        </div>
        <div className="mb-3">
          <Button type="submit">Login</Button>
        </div>
        <p>
          Si no tienes cuenta, registrate{" "}
          <Link
            to="/sign-up"
            data-cy={"go-to-signup-btn"}
            className="underline"
          >
            aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
