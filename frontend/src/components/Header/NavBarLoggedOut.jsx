import { Link, NavLink } from "react-router-dom";
import { activeLinkStyles, Header, LogoLink } from "./headerStyles";
import "./Header.css";

export default function NavBarLoggedOut() {
  console.log("NavBarLoggedOut");

  return (
    <Header>
      <LogoLink to="/">#BetterBank</LogoLink>
      <nav>
        <NavLink
          to="/login"
          style={({ isActive }) => (isActive ? activeLinkStyles : null)}
        >
          Login
        </NavLink>
        <NavLink
          to="createaccount"
          style={({ isActive }) => (isActive ? activeLinkStyles : null)}
        >
          Create Account
        </NavLink>
        {/* <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeLinkStyles : null)}
          className="nav-link"
        >
          About
        </NavLink> */}
        {/* {!token ? (
          <button type="button" onClick={onLogin}>
            Login
          </button>
        ) : (
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        )} */}
      </nav>
    </Header>
  );
}
