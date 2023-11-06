import { Link, Navigate } from "react-router-dom";
import styles from "./SignUp.module.sass";
import { FormEventHandler, useContext, useState } from "react";
import { TokenContext } from "../../../context/TokenContext";
import Input from "../../general/Input";
import Button from "../../general/Button";
import Toastify from "toastify-js";

const SignUp = () => {
  const { token } = useContext(TokenContext);
  const [redirectAfterSignUp, setRedirectAfterSignUp] =
    useState<boolean>(false);

  if (token) {
    return <Navigate to="/" />;
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const username = (
      e.currentTarget.elements.namedItem("username") as RadioNodeList
    ).value;
    const pass = (
      e.currentTarget.elements.namedItem("password") as RadioNodeList
    ).value;
    const repeatedPassword = (
      e.currentTarget.elements.namedItem("repeated-password") as RadioNodeList
    ).value;

    console.log(username, pass, repeatedPassword);

    if (!username || !pass || !repeatedPassword) {
      Toastify({
        text: "Todos los campos son obligatorios",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "toast-error",
      }).showToast();
      return;
    }

    if (pass !== repeatedPassword) {
      Toastify({
        text: "La contraseña debe coincidir",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "toast-error",
      }).showToast();
      return;
    }
    try {
      const signUpResponse = await fetch("./signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pass,
        }),
      });
      if (signUpResponse.status !== 200) {
        const dataSignUp = await signUpResponse.json();
        if (dataSignUp.error) {
          throw new Error(dataSignUp.error);
        }
      }
      Toastify({
        text: "Usuario creado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "toast-success",
      }).showToast();
      setRedirectAfterSignUp(true);
    } catch (error: any) {
      Toastify({
        text: error.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "toast-error",
      }).showToast();
    }
  };

  if (redirectAfterSignUp) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`flex items-start justify-center h-screen text-white`}>
      <form
        className={`${styles.signUpView} my-auto bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-lg text-center `}
        onSubmit={handleOnSubmit}
      >
        <div className="mb-5">
          <Input
            type="email"
            name="username"
            placeholder="Email"
            className="text-white"
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="text-white"
          />
          <Input
            type="password"
            name="repeated-password"
            placeholder="Repetir contraseña"
            className="text-white"
          />
          <Button type="submit" cy="register-btn">
            Regístrate
          </Button>
        </div>
        <p className="mb-4">
          *La contraseña debe contener al menos un carácter en mayúscula, algún
          carácter especial, un número y debe tener una longitud superior a 8
          carácteres.
        </p>
        <p className="">
          Accede a tu cuenta{" "}
          <Link to="/login" className="underline">
            aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
