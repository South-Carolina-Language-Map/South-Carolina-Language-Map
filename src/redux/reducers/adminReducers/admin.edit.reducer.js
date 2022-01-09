const adminEditReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDIT_SITE':
      return [...action.payload];
    case 'EDIT_LANGUAGE_ONCHANGE':
      return {
        ...state,
        [action.payload.property]: action.payload.value
      }
      case 'SET_EDIT_LANGUAGE':
        return action.payload;
    default:
      return state;
  }
};
export default adminEditReducer;