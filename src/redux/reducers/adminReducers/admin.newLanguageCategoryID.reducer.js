const newLanguageCategoryIDReducer = (state = -1, action) => {
    switch (action.type) {
    case 'SET_NEW_CATEGORY':
        console.log("newLanguageCategoryID action.payload", action.payload);
        return action.payload;
    case 'EDIT_LANGUAGE_ONCHANGE':
        return {
          ...state,
          [action.payload.property] : action.payload.value
      }
      default:
        return state;
    }
  };
  export default newLanguageCategoryIDReducer;