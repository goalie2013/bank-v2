import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header/Header";

export default function UserLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
}

function UserNavbar() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <>
      <nav>
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/user/history"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Transaction History
        </NavLink>
      </nav>
    </>
  );
}
