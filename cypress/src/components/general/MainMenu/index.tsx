import { useContext } from "react";
import Button from "../Button";
import Link from "../Link";
import { TokenContext } from "../../../context/TokenContext";
import Home from "../../icons/Home";
import LogOut from "../../icons/LogOut";

const MainMenu = () => {
  const { setToken } = useContext(TokenContext);

  const handleLogOut = () => {
    setToken(null);
  };

  return (
    <div className="flex justify-between p-2 bg-slate-900 shadow-sm">
      <div className="flex gap-2">
        <Link path="/" cy="add-go-home">
          <Home />
        </Link>
        <Link path="/add-movie" cy="add-movie-btn">
          Añadir película
        </Link>
      </div>
      <div>
        <Button onClick={handleLogOut} cy="signout-btn">
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;
