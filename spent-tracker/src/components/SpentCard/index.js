import styles from "./spent-card.module.css";

const SpentCard = ({ id, subject, amount, date, onDelete }) => {
  return (
    <div className={styles["spent-card-container"]}>
      <p>{date}</p>
      <h1>{subject}</h1>
      <h2>{amount}€</h2>
      <button onClick={onDelete.bind(this, id)}>Delete</button>
    </div>
  );
};

export default SpentCard;
