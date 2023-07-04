import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//TODO: Get JWT token to check auth
const ProtectedRoute = ({ children }) => {
  // const { token } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  console.log("ProtectedRoute");
  console.log("token:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
