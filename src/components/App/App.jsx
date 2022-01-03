import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import RegisterPage from "../RegisterPage/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import AboutPage from "../AboutPage/AboutPage";
import GridView from "../GridView/GridView";
import Admin from "../Admin/Admin";

import "./App.css";


// Unsure of the need for these.....
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);
  console.log("user", user);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

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
          {user.clearance_level >= 1 ?
            <>
              <Route
                exact path="/admin">
                <Admin />
              </Route>

  
            </>
            :
            <Redirect to="/login" />
          }




          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
