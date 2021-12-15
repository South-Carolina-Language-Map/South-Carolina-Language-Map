import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import adminSiteReducer from './adminSite.reducer';
import adminLanguagesReducer from './adminLanguages.reducer';
import adminCategoriesReducer from './adminCategories.reducer';
import adminApprovalsReducer from './adminApprovals.reducer';
import adminEditReducer from './adminEdit.reducer';


import infoReducer from './view.info.reducer';
import listReducer from './view.list.reducer';
import listTypeReducer from './view.listType.reducer';
import queriesReducer from './view.queries.reducer';
import sitesReducer from './view.sites.reducer';

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

const viewReducer = combineReducers({
  infoReducer, // {} for info pane
  listReducer, // [] of objs to populate explore lists
  listTypeReducer, // '' provide context for explore clicks
  queriesReducer, // [] holds previous queries
  sitesReducer, // [] holds current list of sites to map

})

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  adminReducer, 
  viewReducer

});

export default rootReducer;
