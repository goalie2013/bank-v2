import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

export default function Header() {
  console.log("HEADER");
  const { onLogin, onLogout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="createaccount">Create Account</Link>
        {/* <Link to="/trial">Trial</Link> */}
        {/* {!token ? (
          <button type="button" onClick={onLogin}>
            Login
          </button>
        ) : (
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        )} */}
        <button type="button" onClick={onLogin}>
          Login
        </button>
      </nav>
    </header>
  );
}
