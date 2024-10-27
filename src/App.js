import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/toastr.min.css";
import ProtectedRoute from "./helpers/PrivateRoute";
import DashboardContainer from "./pages/dashboard/Dashboard.Container";
import LoginContainer from "./pages/login/Login.Container";
import theme from "./theme";
import ProfileContainer from "./pages/profile/Profile.Container";
import TransContainer from "./pages/transaction/Transaction.Container";

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginContainer />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardContainer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileContainer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransContainer />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
