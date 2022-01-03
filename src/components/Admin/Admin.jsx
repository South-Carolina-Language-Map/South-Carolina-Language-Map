import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import AdminHome from '../AdminHome/AdminHome';
import AdminLanguage from '../AdminLanguage/AdminLanguage';
import AdminCategory from '../AdminCategory/AdminCategory';
import AdminApprovals from '../AdminApprovals/AdminApprovals';
import AdminAbout from '../AdminAbout/AdminAbout';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';


function Admin() {
  let currentAdminView;

  //stores
  const adminView = useSelector((store) => store.adminView)

  //switch statement to control which components
  //are being called in the view

  switch (adminView) {
    case "site":
      currentAdminView = <AdminHome />
      break;
    case "language":
      currentAdminView = <AdminLanguage />
      break;
    case "category":
      currentAdminView = <AdminCategory />
      break;
    case "approval":
      currentAdminView = <AdminApprovals />
      break;
    case "about":
      currentAdminView = <AdminAbout />
      break;
    case "login":
      currentAdminView = <LoginPage />
      break;
    case "register":
      currentAdminView = <RegisterPage />
      break;

    default:
      currentAdminView = <p>There was an error, please try again later</p>
      break;
  }


  console.log('this is the view', adminView);
  //admin components called from here
  return (
    <>
      <Nav />
      <p>ADMIN COMPONENT</p>
      <Footer />
    </>
  )
}

export default Admin;
