import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton";
import { activeLinkStyles, Header, LogoLink } from "./headerStyles";
import "./Header.css";

export default function NavBarLoggedIn() {
  console.log("NavBarLoggedIn");

  return (
    <Header>
      <LogoLink to="user">#BetterBank</LogoLink>
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
    </Header>
  );
}
