import { ReactNode, FC } from "react";

interface IPropButton {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  cy?: string;
  onClick?: () => void;
}

const Button: FC<IPropButton> = ({ children, cy, ...props }) => {
  return (
    <button
      {...props}
      data-cy={cy}
      className="bg-indigo-500 px-4 py-3 inline-block rounded text-white hover:bg-indigo-700"
    >
      {children}
    </button>
  );
};

export default Button;
