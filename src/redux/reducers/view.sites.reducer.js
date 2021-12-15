// [] holds current list of sites to map

const sitesReducer = (state=[], action) => {
    switch(action.type){
        case 'SET_SITES':
            return [...action.payload];
        default:
            return state;
    }
}

export default sitesReducer;