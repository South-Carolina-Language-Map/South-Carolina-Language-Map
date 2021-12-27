const adminEditReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EDIT_SITE':
        return [...action.payload];
      default:
        return state;
    }
  };
  export default adminEditReducer;