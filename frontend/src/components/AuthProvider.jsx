import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      //suspense: true,
    },
  },
});

// NOTE: Context does not save on page refresh
const AuthProvider = ({ children }) => {
  console.log("AuthProvider");
  const navigate = useNavigate();

  // state needed for Header Component & Home Page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (accessToken, refreshToken) => {
    console.log("handleLogin()");

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);
    // return <Navigate to="user" replace />;
    navigate("/user");
  };

  const handleLogout = () => {
    console.log("handleLogout()");

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    // TODO: erase navigation history??
    return <Navigate to="/" replace />;
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
    isLoggedIn,
  };

  console.log("isLoggedIn:", isLoggedIn);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default AuthProvider;
