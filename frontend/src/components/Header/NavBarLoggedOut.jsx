import { Link, NavLink } from "react-router-dom";

export default function NavBarLoggedOut() {
  console.log("NavBarLoggedOut");

  const activeLinkStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #BetterBank
      </Link>
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
      </nav>
    </header>
  );
}
