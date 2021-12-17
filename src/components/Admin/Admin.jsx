import React, { useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';


// import AdminHome from '../AdminHome/AdminHome';
// import AdminLanguage from '../AdminLanguage/AdminLanguage';
// import AdminCategory from '../AdminCategory/AdminCategory';
// import AdminApprovals from '../AdminApprovals/AdminApprovals';
// import AdminAbout from '../AdminAbout/AdminAbout';



function Admin() {


  //admin components called from here
  return(
    <>
    <Nav />
  <p>I AM IN ADMIN</p>
  </>
  )
}

export default Admin;
