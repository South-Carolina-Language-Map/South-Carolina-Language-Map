const adminSiteReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADMIN_SITES':
        return [...action.payload];
      default:
        return state;
    }
  };
  export default adminSiteReducer;