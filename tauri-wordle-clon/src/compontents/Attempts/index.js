import React from "react";
import style from "./attempts.module.css";

const Attempts = ({ attempts, maxAttempts }) => {
  return (
    <span className={style.container}>
      {attempts} / {maxAttempts}
    </span>
  );
};

export default Attempts;
