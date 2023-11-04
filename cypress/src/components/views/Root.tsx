import { Navigate, Outlet } from "react-router-dom";
import MainMenu from "../general/MainMenu";
import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import Footer from "../general/Footer";
import styles from "./Root.module.scss";

const Root = () => {
  const { token } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <MainMenu />
        <div className={styles.viewWrapperContainer}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Root;
