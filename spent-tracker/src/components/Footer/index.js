import styles from "./footer.module.css";

const Footer = ({ total = 0 }) => {
  return (
    <div className={styles["footer-container"]}>
      <h1>Total: {total}</h1>
    </div>
  );
};

export default Footer;
