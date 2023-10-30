import { ReactNode, FC } from "react";

interface IPropButton {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: FC<IPropButton> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-indigo-500 px-4 py-3 inline-block rounded text-white"
    >
      {children}
    </button>
  );
};

export default Button;
