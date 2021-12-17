import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

//components
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import AdminHome from '../AdminHome/AdminHome';
import AdminLanguage from '../AdminLanguage/AdminLanguage';
import AdminCategory from '../AdminCategory/AdminCategory';
import AdminApprovals from '../AdminApprovals/AdminApprovals';
import AdminAbout from '../AdminAbout/AdminAbout';



function Admin() {


  //admin components called from here
  return (
    <p>ADMIN COMPONENT</p>
    // <>
    // <Router>
    //   <Switch>
    //   <Nav />

    //   {/* takes user to sites table view */}
    //   <Route

    //     exact
    //     path="/admin/site"
    //   >
    //     <AdminHome />
    //   </Route>

    //   {/* takes user to About view */}
    //   <Route
    //     exact
    //     path="/admin/about"
    //   >
    //     <AdminAbout />
    //   </Route>


    //   <p>I AM IN ADMIN</p>
    //   </Switch>

    //   <Route>
    //     ADMIN 404
    //   </Route>
    //   <Footer />
    //   </Router>
    // </>
  )
}

export default Admin;
