import { useNavigate } from "react-router-dom";
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

// Using local storage over context bc context does not save on page refresh
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  //TODO: Get JWT token to store in local storage
  const handleLogin = async () => {
    console.log("handleLogin()");

    localStorage.setItem("token", "login tokenr3wer23r");
    navigate("user");
  };

  const handleLogout = () => {
    console.log("handleLogout");
    localStorage.removeItem("token");
    navigate("/");
    // erase history??
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default AuthProvider;
