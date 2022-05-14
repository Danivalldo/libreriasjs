/*
* Componente para mostrar cada palabra intentada
*/


import Letter from "../Letter";
import style from './word.module.css';

const Word = ({word, result}) => {
  return (
    <div className={style.container}>
      {word.map((letter, i)=>{
        return <Letter key={i} letter={letter} result={result && result[i]} />
      })}
    </div>
  );
};

export default Word;