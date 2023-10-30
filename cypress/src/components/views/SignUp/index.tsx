import { Link, Navigate } from "react-router-dom";
import styles from "./SignUp.module.sass";
import { useContext } from "react";
import { TokenContext } from "../../../context/TokenContext";
import Input from "../../general/Input";
import Button from "../../general/Button";

const SignUp = () => {
  const { token } = useContext(TokenContext);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.signUpView}>
      <Input type="text" name="username" placeholder="Email" />
      <Input type="password" name="password" placeholder="Password" />
      <Input
        type="password"
        name="repeated-password"
        placeholder="Repetir password"
      />
      <Button type="submit">Register</Button>
      <p>
        Accede a tu cuenta <Link to="/login">aqui</Link>
      </p>
    </form>
  );
};

export default SignUp;
