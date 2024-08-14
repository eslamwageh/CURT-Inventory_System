import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";

function Navbar() {
  const { isLoggedIn, logout, username } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logocontainer}>
        <Link to="/">
          <img
            className={styles.logo}
            src="./src/components/Navbar/pngegg.png"
          />
        </Link>
      </div>

      <ul className={styles.contents}>
        {!isLoggedIn && (
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        )}
        {isLoggedIn && <li onClick={handleLogout}>LOGOUT</li>}
        {isLoggedIn && <p style={{ color: "white" }}>Hi, {username}😀</p>}
      </ul>
    </div>
  );
}

export default Navbar;
