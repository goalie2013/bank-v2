import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

// Using local storage over context bc context does not save on page refresh
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  //TODO: Get JWT token to store in local storage
  const handleLogin = async () => {
    console.log("handleLogin");
    localStorage.setItem("token", "login tokenr3wer23r");
    navigate("trial");
  };

  const handleLogout = () => {
    console.log("handleLogout");
    localStorage.removeItem("token");
    navigate("/");
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
