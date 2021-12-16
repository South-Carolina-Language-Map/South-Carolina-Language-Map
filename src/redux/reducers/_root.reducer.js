import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import adminSiteReducer from './adminReducers/admin.sites.reducer';
import adminLanguagesReducer from './adminReducers/admin.languages.reducer';
import adminCategoriesReducer from './adminReducers/admin.categories.reducer';
import adminApprovalsReducer from './adminReducers/admin.approvals.reducer';
import adminEditReducer from './adminReducers/admin.edit.reducer';

import infoReducer from './viewReducers/view.info.reducer';
import listReducer from './viewReducers/view.list.reducer';
import listTypeReducer from './viewReducers/view.listType.reducer';
import queriesReducer from './viewReducers/view.queries.reducer';
import sitesReducer from './viewReducers/view.sites.reducer';

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
