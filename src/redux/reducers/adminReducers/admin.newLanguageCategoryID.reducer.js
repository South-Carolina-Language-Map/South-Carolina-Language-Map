const newLanguageCategoryIDReducer = (state = {category_id: ''}, action) => {
    switch (action.type) {
    case 'SET_NEW_CATEGORY':
        console.log("newLanguageCategoryID action.payload", action.payload);
        return {...state, category_id: action.payload};
      default:
        return state;
    }
  };
  export default newLanguageCategoryIDReducer;