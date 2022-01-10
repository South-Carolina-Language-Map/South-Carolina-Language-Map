const clearAutoCompleteReducer = (state = false, action) => {
    switch (action.type) {
    case 'RESET_AUTOCOMPLETE':
        return !state;
      default:
        return state;
    }
  };
  export default clearAutoCompleteReducer;