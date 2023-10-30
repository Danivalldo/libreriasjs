import { Navigate, Outlet } from "react-router-dom";
import MainMenu from "../general/MainMenu";
import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";

const Root = () => {
  const { token } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <MainMenu />
      <Outlet />
    </>
  );
};

export default Root;
