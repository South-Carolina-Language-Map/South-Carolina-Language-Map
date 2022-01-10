const newLanguageCategoryIDReducer = (state = -1, action) => {
    switch (action.type) {
    case 'SET_NEW_CATEGORY':
        return action.payload;
      default:
        return state;
    }
  };
  export default newLanguageCategoryIDReducer;