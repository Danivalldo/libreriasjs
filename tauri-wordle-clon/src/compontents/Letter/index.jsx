import styles from './letter.module.css';

const Letter = ({letter, result}) => {
  return (
    <div className={`${styles.container} ${typeof result === 'number'?styles[`result-${result}`]:''}`}>
      {letter}
    </div>
  );
};

export default Letter;