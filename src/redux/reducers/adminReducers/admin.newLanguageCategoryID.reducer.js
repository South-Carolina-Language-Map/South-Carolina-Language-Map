const newLanguageCategoryIDReducer = (state = -1, action) => {
    switch (action.type) {
    case 'SET_NEW_CATEGORY':
        console.log("newLanguageCategoryID action.payload", action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  export default newLanguageCategoryIDReducer;