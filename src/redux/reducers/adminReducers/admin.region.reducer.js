const adminRegionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REGIONS':
        return [...action.payload];
      default:
        return state;
    }
  };
  export default adminRegionReducer;