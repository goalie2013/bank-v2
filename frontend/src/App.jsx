import { createContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import AuthProvider from "./components/AuthProvider";
import Home from "./pages/Home";
import UserLayout from "./components/UserLayout";
import UserHome from "./pages/UserHome";
import UserHistory from "./pages/UserHistory";
import Login from "./pages/Login";
import CreateAccount from "./pages/Account/CreateAccount";
import NotFound from "./pages/NotFound";
import Trial from "./pages/Trial";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteProps from "./components/ProtectedRouteProps";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Context data gets DELETED AFTER PAGE REFRESH
export const AuthContext = createContext(null);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="createaccount" element={<CreateAccount />} />
            <Route path="login" element={<Login />} />

            <Route
              path="trial"
              element={
                <ProtectedRoute>
                  <Trial />
                </ProtectedRoute>
              }
            />
            <Route path="user" element={<UserLayout />}>
              <Route
                index
                element={
                  <ProtectedRouteProps
                    renderItem={(data) => <UserHome data={data} />}
                  />
                }
              />
              <Route
                path="history"
                element={
                  <ProtectedRouteProps
                    renderItem={(data) => <UserHistory data={data} />}
                  />
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
