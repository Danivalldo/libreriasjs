/*
* Componente para mostrar cada letra
*/

import styles from './letter.module.css';

const Letter = ({letter, result}) => {
  return (
    <div className={`${styles.container}`}>
      <span className={styles['letter-wrapper']}>{letter}</span>
      <span className={`${typeof result === 'number'?styles.active:''} ${styles['bg-letter']} ${typeof result === 'number'?styles[`result-${result}`]:''}`}></span>
    </div>
  );
};

export default Letter;