const adminEditReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDIT_SITE':
      return [...action.payload];
    case 'EDIT_LANGUAGE_ONCHANGE':
      return {
        ...state,
        [action.payload.property]: action.payload.value
      }
    default:
      return state;
  }
};
export default adminEditReducer;