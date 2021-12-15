const queriesReducer = (state=[], action) => {
    switch(action.type){
        case 'NEW_QUERY':
            return [action.payload, ...state];
        default:
            return state;
    }
}

export default queriesReducer;