import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import adminSiteReducer from './adminSite.reducer';
import adminLanguagesReducer from './adminLanguages.reducer';
import adminCategoriesReducer from './adminCategories.reducer';
import adminApprovalsReducer from './adminApprovals.reducer';
import adminEditReducer from './adminEdit.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

const adminReducer = combineReducers({
  adminSiteReducer,
  adminLanguagesReducer,
  adminCategoriesReducer,
  adminApprovalsReducer,
  adminEditReducer
})

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  adminReducer, 
  
});

export default rootReducer;
