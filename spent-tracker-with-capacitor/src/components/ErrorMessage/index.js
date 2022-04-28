import style from "./error-message.module.css";

const ErrorMessage = ({ message }) => {
  return <div className={style["error-message-container"]}>{message}</div>;
};

export default ErrorMessage;
