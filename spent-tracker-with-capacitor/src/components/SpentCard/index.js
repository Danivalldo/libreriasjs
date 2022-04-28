import styles from "./spent-card.module.css";

const SpentCard = ({ id, subject, amount, date, onDelete }) => {
  return (
    <div className={styles["spent-card-container"]}>
      <div className={styles.wrapper}>
        <p className={styles.date}>{date}</p>
        <h1 className={styles.subject}>{subject}</h1>
        <h2 className={styles.amount}>{amount}€</h2>
        <button className={styles.btn} onClick={onDelete.bind(this, id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SpentCard;
