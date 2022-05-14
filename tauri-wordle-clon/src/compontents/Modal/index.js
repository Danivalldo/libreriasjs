/*
 * Componente Modal
 */

import styles from "./modal.module.css";

const Modal = ({ active, children }) => {
  return (
    <div className={`${styles.container} ${active && styles.active}`}>
      <div className={styles["children-container"]}>{children}</div>
    </div>
  );
};

export default Modal;
