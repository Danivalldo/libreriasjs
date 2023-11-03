import { ChangeEvent, FC } from "react";

interface IPropsInput {
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IPropsInput> = (props) => {
  return (
    <input
      {...props}
      // onChange={(e:ChangeEvent<HTMLInputElement>)=>{}}
      className="block w-full rounded-md  py-1.5 px-1.5 mb-1.5"
    />
  );
};

export default Input;
