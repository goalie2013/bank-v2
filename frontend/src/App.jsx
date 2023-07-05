import { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import AuthProvider from "./components/AuthProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/Account/CreateAccount";
import NotFound from "./pages/NotFound";
import Trial from "./pages/Trial";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Context data gets DELETED AFTER PAGE REFRESH
export const AuthContext = createContext(null);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      suspense: true,
    },
  },
});

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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
