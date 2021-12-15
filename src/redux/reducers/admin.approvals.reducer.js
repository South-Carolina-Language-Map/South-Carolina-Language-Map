const adminApprovalsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_APPROVALS':
        return [...action.payload];
      default:
        return state;
    }
};

export default adminApprovalsReducer;