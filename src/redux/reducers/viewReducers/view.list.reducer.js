// [] of objs to populate explore lists

const listReducer = (state=[], action) => {
    switch(action.type){
        case 'SET_LIST':
            return [...action.payload];
        default:
            return state;
    }
}

export default listReducer;