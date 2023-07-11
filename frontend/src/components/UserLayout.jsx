import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

export default function UserLayout() {
  return (
    <>
      <h2>User</h2>
      <Outlet />
    </>
  );
}
