const newSiteReducer = (state = {region_id: '', language_id: ''}, action) => {
    switch (action.type) {
    case 'SET_NEW_REGION':
        console.log("newSiteReducer action.payload", action.payload);
        return {...state, region_id: action.payload};
    case 'SET_NEW_LANGUAGE':
        console.log("newSiteReducer language_id", action.payload);
        return {...state, language_id: action.payload};
    // case 'CLEAR_AUTO_FIELDS':
    //   console.log("newSiteReducer language_id", action.payload);
    //   return {...state,} 
      default:
        return state;
    }
  };
  export default newSiteReducer;