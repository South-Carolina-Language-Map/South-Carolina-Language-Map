const adminSiteReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_SITES':
        return [...action.payload];
      default:
        return state;
    }
  };
  export default adminSiteReducer;