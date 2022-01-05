// [] of objs to populate explore lists

const listReducer = (state = [
    { name: 'Sites' },
    { name: 'Languages' },
    { name: 'Categories' },
    { name: 'Regions' },
], action) => {
    switch (action.type) {
        case 'SET_LIST':
            return [...action.payload];
        case 'SET_LIST_DEFAULT':
            return [
                { name: 'Sites' },
                { name: 'Languages' },
                { name: 'Categories' },
                { name: 'Regions' },
            ];
        case 'SET_CATEGORIES':
        case 'SET_REGIONS':
            return [...action.payload];
        default:
            return state;
    }
}

export default listReducer;