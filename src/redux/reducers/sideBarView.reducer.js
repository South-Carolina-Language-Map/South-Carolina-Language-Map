const sideBarView = (state = "info", action) => {
    switch (action.type) {
        case 'SET_CURRENT_VIEW':
            return action.payload;
        default:
            return state;
    }
};

export default sideBarView;