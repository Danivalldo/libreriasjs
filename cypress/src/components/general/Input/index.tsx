import { FC } from "react";

interface IPropsInput {
  type: string;
  name: string;
  placeholder?: string;
}

const Input: FC<IPropsInput> = (props) => {
  return (
    <input
      {...props}
      className="block w-full rounded-md  py-1.5 px-1.5 mb-1.5"
    />
  );
};

export default Input;
