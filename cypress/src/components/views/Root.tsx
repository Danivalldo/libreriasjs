import { Navigate, Outlet } from "react-router-dom";
import MainMenu from "../general/MainMenu";
import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import Footer from "../general/Footer";

const Root = () => {
  const { token } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <MainMenu />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
