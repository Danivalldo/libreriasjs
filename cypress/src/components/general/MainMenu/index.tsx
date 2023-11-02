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
    <div className="flex justify-between">
      <div>
        <Link path="/" cy="add-go-home">
          Home
        </Link>
        <Link path="/add-movie" cy="add-movie-btn">
          Add Movie
        </Link>
      </div>
      <div>
        <Button onClick={handleLogOut} cy="signout-btn">
          Log out
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;
