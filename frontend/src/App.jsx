import { createContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import AuthProvider from "./providers/AuthProvider";
import Home from "./pages/AppHome/Home";
import About from "./pages/About";
import UserLayout from "./components/UserLayout";
import UserHome from "./pages/User/UserHome";
import UserHistory from "./pages/User/UserHistory";
import Login from "./pages/AppHome/Login";
import CreateAccount from "./pages/AppHome/CreateAccount";
import NotFound from "./pages/NotFound";
import Trial from "./pages/Trial";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteProps from "./components/ProtectedRouteProps";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorProvider, { CProvider } from "./providers/ThemeProvider";
import ApiService from "./service";

// Context data gets DELETED AFTER PAGE REFRESH
export const AuthContext = createContext(null);
export const ThemeContext = createContext(null);

ApiService.hey();

function App() {
  const apiService = new ApiService();

  return (
    <BrowserRouter>
      <AuthProvider>
        <ColorProvider>
          <CProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                  path="createaccount"
                  element={<CreateAccount apiService={apiService} />}
                />
                <Route path="login" element={<Login />} />
                <Route path="about" element={<About />} />

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
          </CProvider>
        </ColorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
