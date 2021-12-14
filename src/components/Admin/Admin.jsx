import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import AdminHome from '../AdminHome/AdminHome';
import AdminLanguage from '../AdminLanguage/AdminLanguage';
import AdminCategory from '../AdminCategory/AdminCategory';
import AdminApprovals from '../AdminApprovals/AdminApprovals';
import AdminAbout from '../AdminAbout/AdminAbout';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Admin() {

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav/>
      <Switch>
          //ADMIN HOME/SITE
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/admin"
          >
            <AdminHome/>
          </ProtectedRoute>

          //ADMIN LANGUAGE
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/admin/language"
          >
            <AdminLanguage />
          </ProtectedRoute>

          //ADMIN CATEGORY
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/admin/category"
          >
            <AdminCategory />
          </ProtectedRoute>

          //APPROVALS PAGE
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/admin/approvals"
          >
            <AdminApprovals />
          </ProtectedRoute>

          //ADMIN ABOUT
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/admin/info"
          >
            <AdminAbout />
          </ProtectedRoute>


          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/admin" />
              :
              // Otherwise, show the login page
              <LoginPage  />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/admin" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

      </Switch>
      </div>
    </Router>
    
  )

}

export default Admin;
