import { Link } from "react-router-dom";
import styles from "./View404.module.css";

const View404 = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <Link to="/">Go to home</Link>
    </div>
  );
};

export default View404;
