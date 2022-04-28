import styles from "./footer.module.css";

const Footer = ({ total = 0 }) => {
  return (
    <div className={styles["footer-container"]}>
      Total: <span className={styles.total}>{total}</span>€
    </div>
  );
};

export default Footer;
