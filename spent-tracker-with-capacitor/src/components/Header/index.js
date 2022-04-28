import Illustration from "../Illustration";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles["header-container"]}>
      <div>
        <h1 className={styles.title}>Expense Tracker</h1>
      </div>
      <Illustration />
      <div className={styles.wave}></div>
    </div>
  );
};

export default Header;
