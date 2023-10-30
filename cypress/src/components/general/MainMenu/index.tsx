import { useContext } from "react";
import Button from "../Button";
import Link from "../Link";
import { TokenContext } from "../../../context/TokenContext";

const MainMenu = () => {
  const { setToken } = useContext(TokenContext);

  const handleLogOut = () => {
    setToken(null);
  };

  return (
    <div>
      <Button onClick={handleLogOut}>Log out</Button>
    </div>
  );
};

export default MainMenu;
