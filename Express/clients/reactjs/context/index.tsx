import React from "react";
import { UserContextProvider } from "./UserContext";

const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>
    </>
  );
};

export default StateContextProvider;
