
//controls admin view via navbar
const adminView = (state = "info", action) => {
    switch (action.type) {
        case 'SET_ADMIN_VIEW':
            return action.payload;
        default:
            return state;
    }
};

export default adminView;