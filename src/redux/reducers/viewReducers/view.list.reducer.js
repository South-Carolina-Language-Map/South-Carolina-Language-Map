// [] of objs to populate explore lists

const listReducer = (state=[], action) => {
    switch(action.type){
        case 'SET_LIST':
            return [...action.payload];
        case 'SET_LIST_DEFAULT':
            return [
                'Sites',
                'Categories',
                'Regions',
                'Languages'
            ];
        case 'SET_CATEGORIES':
            return [...action.payload];
        default:
            return state;
    }
}

export default listReducer;