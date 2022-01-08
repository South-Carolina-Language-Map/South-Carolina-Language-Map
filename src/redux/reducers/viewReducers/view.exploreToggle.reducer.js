const exploreToggle = (state=true, action) => {
    switch(action.type){
        case 'EXPLORE_TOGGLE':
            return !state;
        default:
            return state;
    }
}

export default exploreToggle;