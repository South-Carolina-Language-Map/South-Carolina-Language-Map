const newSiteReducer = (state = {region_id: '', language_id: ''}, action) => {
    switch (action.type) {
    case 'SET_NEW_REGION':
        return {...state, region_id: action.payload};
    case 'SET_NEW_LANGUAGE':
        return {...state, language_id: action.payload};
      default:
        return state;
    }
  };
  export default newSiteReducer;