// {} for info pane

const infoReducer = (state={}, action) => {
    switch(action.type){
        case 'SET_INFO':
            return [...action.payload];
        default:
            return state;
    }
}

export default infoReducer;