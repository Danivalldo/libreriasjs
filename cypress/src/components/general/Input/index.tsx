import { ChangeEvent, FC } from "react";

interface IPropsInput {
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IPropsInput> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`block w-full rounded-md  py-1.5 px-1.5 mb-1.5 ${
        className || ""
      }`}
    />
  );
};

export default Input;
