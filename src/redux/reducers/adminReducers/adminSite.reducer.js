const adminSiteReducer = (state = [], action) => {
    switch (action.type) {
<<<<<<< HEAD:src/redux/reducers/admin.sites.reducer.js
      case 'SET_SITES':
=======
      case 'SET_ADMIN_SITES':
>>>>>>> development:src/redux/reducers/adminReducers/adminSite.reducer.js
        return [...action.payload];
      default:
        return state;
    }
  };
  export default adminSiteReducer;