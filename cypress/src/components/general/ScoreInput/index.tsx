import { FC } from "react";
import styles from "./ScoreInput.module.scss";
import Star from "../../icons/Star";

interface IPropsScoreInput {
  score: number;
  onChange: (score: number) => void;
}

const ScoreInput: FC<IPropsScoreInput> = ({ score, onChange }) => {
  return (
    <div className={styles.scoreInput}>
      <span
        data-cy="star-btn-1"
        className={`${styles.star} ${score >= 1 ? styles.filled : ""}`}
        onClick={onChange.bind(this, 1)}
      >
        <Star />
      </span>
      <span
        data-cy="star-btn-2"
        className={`${styles.star} ${score >= 2 ? styles.filled : ""}`}
        onClick={onChange.bind(this, 2)}
      >
        <Star />
      </span>
      <span
        data-cy="star-btn-3"
        className={`${styles.star} ${score >= 3 ? styles.filled : ""}`}
        onClick={onChange.bind(this, 3)}
      >
        <Star />
      </span>
      <span
        data-cy="star-btn-4"
        className={`${styles.star} ${score >= 4 ? styles.filled : ""}`}
        onClick={onChange.bind(this, 4)}
      >
        <Star />
      </span>
      <span
        data-cy="star-btn-5"
        className={`${styles.star} ${score >= 5 ? styles.filled : ""}`}
        onClick={onChange.bind(this, 5)}
      >
        <Star />
      </span>
    </div>
  );
};

export default ScoreInput;
