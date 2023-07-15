import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton";

export default function NavBarLoggedIn() {
  console.log("NavBarLoggedIn");

  const activeLinkStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link className="site-logo" to="user">
        #BetterBank
      </Link>
      <nav>
        <NavLink
          to="history"
          style={({ isActive }) => (isActive ? activeLinkStyles : null)}
        >
          User History
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeLinkStyles : null)}
        >
          About
        </NavLink>
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
        <LogoutButton />
      </nav>
    </header>
  );
}
