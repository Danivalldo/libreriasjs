import { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface IPropsLink {
  children: ReactNode;
  path: string;
  cy?: string;
}

const Link: FC<IPropsLink> = ({ children, path, cy }) => {
  return (
    <RouterLink
      to={path}
      className="bg-indigo-500 px-4 py-3 inline-block rounded text-white"
      data-cy={cy}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
