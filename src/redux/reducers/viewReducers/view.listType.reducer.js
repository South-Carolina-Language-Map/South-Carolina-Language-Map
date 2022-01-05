// '' provide context for explore clicks

const listTypeReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_TYPE':
            return action.payload;
        case 'SET_LIST_DEFAULT':
            return 'DEFAULT';
        default:
            return state;
    }
}

export default listTypeReducer;