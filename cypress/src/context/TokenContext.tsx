import {
  createContext,
  useState,
  useEffect,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
  Context,
} from "react";

const CY_MY_MOVIES_TOKEN = "CY_MY_MOVIES_TOKEN";

interface ITokenContextProviderProps {
  children: ReactNode;
}

interface IpropsContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

let TokenContext: Context<IpropsContext>;

const TokenContextProvider: FC<ITokenContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem(CY_MY_MOVIES_TOKEN);
    return token || null;
  });

  TokenContext = createContext<IpropsContext>({
    token: null,
    setToken,
  });

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(CY_MY_MOVIES_TOKEN);
      return;
    }
    localStorage.setItem(CY_MY_MOVIES_TOKEN, token);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenContextProvider };
