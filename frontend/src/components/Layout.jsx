import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import NavBarLoggedOut from "./Header/NavBarLoggedOut";
import { useAuthFetchUser } from "../queries";

export default function Layout() {
  console.log("LAYOUT");

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/*
export default function Layout() {
  console.log("LAYOUT");
  
  const token = localStorage.getItem("token");
    console.log("token", token);

    if (!token) {
      console.warn("LAYOUT: NO TOKEN!");

      const refreshToken = localStorage.getItem("refreshToken");
      refreshToken && localStorage.removeItem("refreshToken");
      return (
        <>
          <Header loggedIn={false} />
          <main>
            <Outlet context={{ data: null, isFetching: null, status: null }} />
          </main>
          <Footer />
        </>
      );
    }

    // const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useAuthFetchUser({ token });
    console.log("status:", status, "data", data);

    if (status === "error") {
      console.error("HEADER Error:", error.message);
      // return <span>Error: {error.message}</span>;
      // TODO: Update return component; Erase token? Sign user out?
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return (
        <>
          <Header loggedIn={false} />
          <main>
            <Outlet context={{ data: "token", isFetching: null, status: null }} />
          </main>
          <Footer />
        </>
      );
    }

    if (status === "loading") {
      console.log("LOADING...");
      // return <Loading />
      // return <h3>Loading</h3>;
    }

    return (
      <>
        <Header loggedIn={true} />
        <main>
          <Outlet context={{ data, isFetching, status }} />
        </main>
        <Footer />
      </>
    );
  }
*/
