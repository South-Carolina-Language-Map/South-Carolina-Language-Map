// React imports
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";

// Local file imports
import "./App.css";
import Admin from "../Admin/Admin";
import GridView from "../GridView/GridView";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4b6ba6",
      },
      background: {
        main: "#f4f1eb",
      },
      secondary: {
        main: "#000000",
      },
    },
  });

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);
  console.log("user", user);

  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <Route exact path="/home">
              <GridView />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

            <Route exact path="/login">
              {user.clearance_level >= 1 ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/admin" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.clearance_level >= 1 ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/admin" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            {/* View for admins */}
            {user.clearance_level >= 1 ? (
              <>
                <Route exact path="/admin">
                  <Admin />
                </Route>
              </>
            ) : (
              <Redirect to="/login" />
            )}

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
